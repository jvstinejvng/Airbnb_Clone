const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

const validateReview = [
    check('review')
     .exists({ checkFalsy: true })
     .withMessage('Review text is required'),
    check('stars')
      .isLength({ min: 1, max: 5 })
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

// Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const updatedReview = await Review.findByPk(req.params.reviewId);
  const { review, stars } = req.body;
  const err = {
    message: "Validation error",
    statusCode: 400,
    errors: {},
  };

  if (!updatedReview || updatedReview.userId !== req.user.id) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (!review) err.errors.review = "Review text is required";
  if (stars < 1 || stars > 5)
    err.errors.stars = "Stars must be an integer from 1 to 5";
  if (!review || !stars) {
    return res.status(400).json(err);
  }

  updatedReview.review = review;
  updatedReview.stars = stars;
  await updatedReview.save();
  res.json(updatedReview);
});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/image", requireAuth, async (req, res) => {
  const { url } = req.body;
  const currentUserId = req.user.id;
  const review = await Review.findByPk(req.params.reviewId, {
    where: { userId: req.user.id },
  });

  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (review.userId !== currentUserId) {
    res.status(403);
    res.json({
      message: "Only owners of the property can add an image",
      statusCode: 403,
    });
  }

  const allImages = await Image.findAll({
    where: {
      [Op.and]: [
        { reviewId: req.params.reviewId },
        { imageableType: "Review" },
      ],
    },
  });

  if (allImages.length > 10) {
    return res.status(400).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 400,
    });
  }

  const image = await Image.create({
    reviewId: req.params.reviewId,
    propertyId: review.propertyId,
    imageableId: allImages.length + 1,
    imageableType: "Review",
    url,
  });

  res.json(image);
});

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = req.user.id

  const review = await Review.findOne({
    where: {id : reviewId}
  })

  if (review.userId !== id ) {
    res.status(403);
    res.json({
      "message": "Authorization Error"
    })
  }

  if (!review) {
    res.status(404);
    res.json({
      "message": "Review couldn't be found",
      "statusCode": 404
    })
  }

  await review.destroy();
  await review.save();

  res.json({
    "message": "Successfully deleted",
    "statusCode": 200 
  })
})

module.exports = router;

