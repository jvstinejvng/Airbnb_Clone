const express = require('express');
const {Op} = require('sequelize')

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

// Get all reviews of the current user
router.get("/current-user-review", requireAuth, async (req, res) => {
  const {id} = req.user;

  const reviews = await Review.findAll({
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'previewImage']
        }
      },
      {
        model: Image,
        attributes: ['url']
      }
    ],
    where: {
      userId: id
    }
  })
  res.json(reviews)
});

//Get all reviews by a Spot's id
router.get('/:spotId', async (req, res) => {
  const spotId = req.params.spotId;

  let spot  = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({
      "message": "Spot does not exist!"
    });
  }

  let reviews = await Review.findAll({
    where: {
      spotId: spotId,
    }
  });

  let user = await User.findByPk(spot.ownerId);
  let images = await Image.findByPk(spot.id)


  return res.json({
    reviews,
    user,
    images
  });
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId', requireAuth, validateReview, async (req, res) => {
  let { review, stars } = req.body
  const spotId = req.params.spotId
  const id = req.user.id

  const spot = await Spot.findOne({
      where: { id: spotId}
  })

  if (!spot) {
    return res.status(404).json({
          "message": "Spot couldn't be found",
          "statusCode": 404
      })
  }

  // const user = await Review.findOne({
  //     where:{ userId: req.user.id, spotId: req.params.spotId}
  // })

  const reviewExistence = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        { userId: req.user.id },
      ],
    },
  })

  if (reviewExistence.length >= 1) {
    return res.status(403).json({
      message: "User review for this current spot already exists",
      statusCode: 403
    })
  }

  // if (user) {
  //   return res.status(403).json({
  //         "message": "User already has a review for this spot",
  //         "statusCode": 403
  //     })
  // }

  if (stars > 5 || stars < 0) {
      return res.status(400).json({
          "message": "Validation error",
          "statusCode": 400,
          "errors": {
              "stars": "Stars must be an integer from 1 to 5"
          }
      })
  }

  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spotId,
    review,
    stars,
  })


  res.json({ message: 'Successfully created spot', newReview})
})


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

