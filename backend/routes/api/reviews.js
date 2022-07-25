const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

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

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/image", requireAuth, async (req, res) => {
  const { url } = req.body;
  const userId = req.user.id;
  
  const reviewId = await Review.findByPk(req.params.reviewId, {
    where: { userId: req.user.id }
  });

  if (!reviewId) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if (reviewId.userId !== userId ) {
    res.status(403);
    res.json({
      message: "Only owners of the property can add an image",
      statusCode: 403,
    });
  }

  const images = await Image.findAll({
    where: {
      [Op.and]: [
        { reviewId: req.params.reviewId },
        { imageableType: "Review" },
      ],
    },
  });

  if (images.length > 10) {
    return res.status(400).json({
      message: "Maximum number of images for this resource was reached",
      statusCode: 400,
    });
  }

  const newImage = await Image.create({
    reviewId: req.params.reviewId,
    propertyId: review.propertyId,
    imageableId: allImages.length + 1,
    imageableType: "Review",
    url,
  });

  res.json(newImage);
});


// Edit a Review

// Delete a Review

module.exports = router;

