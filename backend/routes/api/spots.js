const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();

//add query filters to get all spots
router.get("/", async (req, res) => {
  const pagination = {
    filter: []
  }
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  const error = {
    "message": "Validation Error",
    "statusCode": 400,
    "errors": {}
  }

  page = Number(page);
  size = Number(size);


  if (Number.isNaN(page)) page = 0;
  if (Number.isNaN(size)) size = 20;

  if (page > 10) page = 10
  if (size > 20) size = 20

  if (page < 0) error.errors.page = "Page must be greater than or equal to 0"
  if (size < 0) error.errors.size = "Size must be greater than or equal to 0"
  if (Number(maxLat) > 90) {
    error.errors.maxLat = "Maximum latitude is invalid"
    maxLat = false
  }
  if (Number(minLat) < -90) {
    error.errors.maxLat = "Minimum latitude is invalid"
    minLng = false
  }
  if (Number(maxLng) > 180) {
    error.errors.maxLng = "Maximum longitude is invalid"
    maxLng = false
  }
  if (Number(minLng) < -180) {
    error.errors.minLng = "Minimum longitude is invalid"
    minLng = false
  }
  if (Number(minPrice) < 0) {
    error.errors.minPrice = "Maximum price must be greater than 0"
    minPrice = false
  }
  if (Number(maxPrice) < 0) {
    error.errors.maxPrice = "Minimum price must be greater than 0"
    maxPrice = false
  }

  if (page < 0 || size < 0 || (!maxLat && maxLat !== undefined) || (!minLat && minLat !== undefined) || (!maxLng && maxLng !== undefined) || (!minLng && minLng !== undefined) || (!minPrice && minPrice !== undefined) || (!maxPrice && maxPrice !== undefined)) {
    res.status(400);
    res.json(error)
  }

  if (maxLat) {
    pagination.filter.push(
      {
        lat: { [Op.lte]: Number(maxLat) }
      }
    )
  }
  if (minLat) {
    pagination.filter.push(
      {
        lat: { [Op.gte]: Number(minLat) }
      }
    )
  }
  if (minLng) {
    pagination.filter.push(
      {
        lng: { [Op.gte]: Number(minLng) }
      }
    )
  }
  if (maxLng) {
    pagination.filter.push(
      {
        lng: { [Op.lte]: Number(maxLng) }
      }
    )
  }
  if (minPrice) {
    pagination.filter.push(
      {
        price: { [Op.gte]: Number(minPrice) }
      }
    )
  }
  if (maxPrice) {
    pagination.filter.push(
      {
        price: { [Op.lte]: Number(maxPrice) }
      }
    )
  }

  pagination.size = size
  pagination.page = page

  const spots = await Spot.findAll({
    where: {
      [Op.and]: pagination.filter
    },
    limit: pagination.size,
    offset: pagination.size * pagination.page
  })
  res.json({
    spots,
    page: pagination.page,
    size: pagination.size,
  }
  )

})


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
