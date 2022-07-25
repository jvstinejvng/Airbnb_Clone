const express = require('express');
const {Op} = require('sequelize');
const { Image, Review, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Get all Reviews by a Spot's id
router.get('/:spotId', async ( req, res ) => {

  const spotId = req.params.spotId;
  let spot  = await Spot.findByPk(spotId);

  if ( !spot ) {
    return res.status(404).json({
      message: "Spot does not exist!",
      statusCode: 404,
    });
  }

  let reviews = await Review.findAll({
    where: { spotId: spotId }
  });

  let user = await User.findByPk( spot.ownerId );
  let images = await Image.findByPk( spot.id );

  return res.json({
    reviews,
    user,
    images
  });

});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId', requireAuth, async ( req, res ) => {
  const spot = await Spot.findByPk(req.params.spotId);
  const { review, stars } = req.body;
  const error = {
    message: 'Validation error',
    statusCode: 400,
    errors: {},
  };

  if ( !spot ) {
    return res.status(404).json({
      message: "Property couldn't be found",
      statusCode: 404,
    });
  }

  const validateReview = await Review.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId },
        { userId: req.user.id },
      ],
    },
  });

  if ( validateReview.length >= 1 ) {
    return res.status(403).json({
      message: 'User already has a review for this property',
      statusCode: 403,
    });
  }

  if ( !review ) error.errors.review = 'Review text is required';
  if ( stars < 1 || stars > 5 ) error.errors.stars = 'Stars must be an integer from 1 to 5';
  if ( !review || !stars ) { return res.status(400).json(error) }; 

  const newReview = await Review.create({
    userId: req.user.id,
    propertyId: req.params.propertyId,
    review,
    stars
  });

  res.json(newReview);

});

// Edit a Review
router.put('/:reviewId', requireAuth, async ( req, res) => {
  const currentReview = await Review.findByPk(req.params.reviewId);
  const { review, stars } = req.body;
  const error = {
    message: 'Validation error',
    statusCode: 400,
    errors: {},
  };

  if ( !currentReview || currentReview.userId !== req.user.id ) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if ( !review ) error.errors.review = 'Review text is required';
  if ( stars < 1 || stars > 5 ) error.errors.stars = 'Stars must be an integer from 1 to 5';
  if ( !review || !stars ) { return res.status(400).json(error) };

  currentReview.review = review;
  currentReview.stars = stars;

  await currentReview.save();
  res.json( currentReview );

});

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/image', requireAuth, async ( req, res ) => {
  const { url } = req.body;
  const userId = req.user.id;

  const reviewId = req.params.reviewId;
  let review = await Review.findByPk( reviewId );

  if ( !review ) {
    return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  if ( review.userId !== userId ) {
    return res.status(403).json({
      message: 'Only owners of the property can add an image',
      statusCode: 403,
    });
  }

  const images = await Image.findAll({
    where: {
      [Op.and]: [
        { reviewId: req.params.reviewId },
        { imageableType: 'Review' },
      ],
    },
  });

  if ( images.length > 10 ) {
    return res.status(400).json({
      message: 'Maximum number of images for this resource was reached',
      statusCode: 400,
    });
  }

  const newImage = await Image.create({
    imageableId: images.length + 1,
    imageableType: 'Review',
    url,
  });

  res.json(newImage);

});

// Delete a Review
router.delete('/:reviewId', requireAuth, async ( req, res ) => {
  const id = req.user.id;

  const reviewId = req.params.reviewId;
  const review = await Review.findOne({
    where: { id : reviewId }
  });

  if ( review.userId !== id ) {
    return res.status(403).json({
      message: "Authorization Error"
    });
  }

  if ( !review ) {
   return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await review.destroy();
  await review.save();

  return res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200,
  });

});

module.exports = router;

