const express = require("express");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { Image, Review, Spot, User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { Op } = require("sequelize");


// get all reviews
router.get("/", async (req, res) => {
  let reviews = await Review.findAll();
  return res.json(reviews);
});

// get all reviews of the current user
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


// create a Review for a Spot based on the Spot's id
router.post('/:spotId/create', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const spots = await Spot.findByPk(req.params.spotId);

    if (!spots) {
      return res.status(404).json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }
  
    const checkIfReviewExists = await Review.findAll({
      where: {
        [Op.and]: [
          { spotId: req.params.spotId },
          { userId: req.user.id },
        ],
      },
    });
  
    if (checkIfReviewExists.length >= 1) {
      return res.status(403).json({
        message: "User already has a review for this property",
        statusCode: 403,
      });
    }

    if (stars < 1 || stars > 5) {
      res.status(400).json({
        message: "Stars must be an integer from 1 to 5",
        statusCode: 400,
      })
    }
    if (review.length < 5) {
      res.status(400).json({
        message: "Review must be more than 5 characters",
        statusCode: 400,
      })
    }
  
    const newReview = await Review.create({
      // userId: req.user.id,
      // spotId: req.params.spotId,
      review,
      stars,
    });
  
    res.json(newReview);
  });

// edit a review
router.put('/:reviewId', requireAuth, async(req, res) => {
  let { stars } = req.body;
  let reviewId = req.params.reviewId;
  let reviewParams = req.body;
  let currentUserId = req.user.id
  
  if (stars < 1 || stars > 5) {
    res.status(400);
    res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    })
  }

  let review = await Review.findByPk(reviewId);

  if (!review) {
    res.status(404);
    res.json({
      message: "Review couldn't be found",
      statusCode: 404
    })
  }


  review = await Review.update(reviewParams, {
    where: {
      id: reviewId
    }
  });
  
  review = await Review.findByPk(reviewId);

  res.json(review)

});

// delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = req.user.id

  const review = await Review.findOne({
    where: {id : reviewId}
  })

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
