const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();

// Get all Spots
router.get("/your-spots", requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
      where: { ownerId: req.user.id },
    });
  
    res.json(allSpots);
  });

// Get details of a Spot from an id
router.get('/:id', async (req,res) => {
  const spots = await Spot.findByPk(req.params.id, {
    include: [
        {
          model: Image,
          as: 'images',
          attributes: ['url']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
      }]
  });

  if (!spots) {
    res.status(404)
    res.json({message: "Spot couldn't be found", statusCode: 404})
  }
  const reviewsAggData = await Spot.findByPk(req.params.id, {
    include: {
        model: Review,
        attributes: []
    },
    attributes: [
        [sequelize.fn('COUNT', sequelize.col('*')), 'numReviews'],
        [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
      ],
    raw: true
});

const spotData = spots.toJSON()
spotData.numReviews = reviewsAggData.numReviews
spotData.avgStarRating = reviewsAggData.avgStarRating


  res.json(spotData)
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews',
  requireAuth,
  async (req, res, next) => {
    const spotId = req.params.spotId

    const spotReview = await Spot.findByPk(spotId);

    if(!spotReview) {
      res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}
      else{
    const reviews = await Review.findAll({
      where: { spotId: spotId},
      include: [
        {
          model: User,
          // as: 'users',
          attributes:['id', 'firstName', 'lastName']
        },
             {
          model: Image,
          // as: 'images'
          attributes: ['url']
        }
      ]
    })
    res.json({reviews})
  }}
  )

// GET all spots owned by the current user
router.get('/userSpots', requireAuth, async (req, res) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });

  res.json(places[0])
});

// Create a Review for a Spot based on the Spot's id
router.post('/:id/reviews', requireAuth, validateReview, async (req, res, next) => {
  const { review, stars } = req.body
  const spotId = req.params.id
  const userId = req.user.id

  const spot = await Spot.findByPk(spotId)
  if (!spot) {
      const err = new Error('Spot couldn\'t be found');
      err.message = "Spot couldn't be found"
      err.status = 404;
      return next(err);
  }

  const reviewPrevious = await Review.findOne({
      where: {
          spotId,
          userId
      }
  })

  if (reviewPrevious) {
      const err = new Error('User already has a review for this spot');
      err.message = "User already has a review for this spot"
      err.status = 403;
      return next(err);
  }

  const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
  })
  res.status(200)
  res.json(newReview)

})

// Create a Booking from a Spot based on the Spot's id


//Create a new Spot
router.post('/', requireAuth, validateSpots, async (req, res) => {
    let { address, city, state, country, lat, lng, name, description, price} = req.body
 
    const newSpot = await Spot.create({
     ownerId: req.user.id,
     address,
     city,
     state,
     country,
     lat,
     lng,
     name,
     description,
     price
    })
 
    res.json({message: 'Successfully created spot', newSpot})
 })

// Edit a spot 
router.put('/:id', requireAuth, validateSpots, async (req, res) => {
    let {address, city, state, country, lat, lng, name, description, price} = req.body
      const spots = await Spot.findByPk(req.params.id, {
        where: {
          ownerId: req.params.id
        }
      })
  
      if (!spots) {
        res.status(404)
       return res.json({
          message: "Spot couldn't be found",
          statusCode: 404
        })
      } else if (spots.ownerId !== req.user.id) {
        return res.status(403).json({message:"Forbidden. You must be owner to edit this spot"})
      }
  
           //spots.ownerId = ownerId
           spots.address = address
           spots.city = city
           spots.state = state
           spots.country = country
           spots.lat = lat
           spots.lng = lng
           spots.name = name
           spots.description = description
           spots.price = price
  
        await spots.save()
        return res.json(spots)
  })

// Add an Image to a Spot based on the Spot's id
router.post(
  '/:spotId/images', restoreUser,  requireAuth,
  async (req, res, next) => {
    const newspotId = req.params.spotId

    const newspotImage = await Spot.findByPk(newspotId);

    if(!newspotImage) {
     return  res.status(404).json({message: "Spot couldn't be found",
  statusCode: 404})}

      if(req.user.id != newspotImage.ownerId) {
        return  res.status(403).json({message: "Forbidden",
  statusCode: 403})
      }
      const {url} = req.body;

      if(!url) {
        res.status(400).json({
          message: "Validation error",
          statusCode: 400,
          errors: "Url is required"
        })

      }
      let newImage = await Image.create({

        imageableId: req.params.spotId,
        imageableType: "Spot",
        spotId: req.params.spotId,
        url
      });

      newImage = newImage.toJSON()
  delete newImage['spotId']
  delete newImage['reviewId']
  delete newImage['createdAt']
  delete newImage['updatedAt']
      res.status(200).json(newImage)
  })

// Delete a spot
router.delete('/:id', async (req, res) => {
  const spots = await Spot.findByPk(req.params.id);

  if(!spots) {
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  }
   res.json({
      message: "Successfully deleted",
      statusCode: 200
    })


  spots.destroy()
  spots.save()
})

module.exports = router;
