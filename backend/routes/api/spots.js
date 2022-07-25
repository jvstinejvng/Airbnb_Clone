const express = require('express');
const { Op } = require('sequelize');
const { Image, Review, Spot, User } = require('../../db/models');
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth, restoreUser } = require("../../utils/auth");
const router = express.Router();


const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true})
    .withMessage('City is required'),
  check('state')
    .exists({checkFalsy: true})
    .withMessage('State is required'),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Name must be less than 50 characters'),
  check('country')
    .exists({checkFalsy: true})
    .withMessage('Country is required'),
  check('lat')
    .exists({checkFalsy: true})
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({checkFalsy: true})
    .withMessage('Longitude is not valid'),
  check('description')
    .exists({checkFalsy: true})
    .withMessage('Description is required'),
  check('price')
    .exists({checkFalsy: true})
    .withMessage('Price per day is required'),
  handleValidationErrors
];

// Add Query Filters to Get All Spots
router.get('/', async ( req, res ) => {
  const pagination = { filter: [] };
  const error = {
    message: 'Validation Error',
    statusCode: 400,
    errors: {}
  };

  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  page = Number( page );
  size = Number( size );

  if ( Number.isNaN(page) ) page = 0;
  if ( Number.isNaN(size) ) size = 20;
  if ( page > 10 ) page = 10;
  if ( size > 20 ) size = 20;
  if ( page < 0 ) error.errors.page = "Page must be greater than or equal to 0"
  if ( size < 0 ) error.errors.size = "Size must be greater than or equal to 0"

  if ( Number(maxLat) > 90 ) { 
    error.errors.maxLat = "Maximum latitude is invalid"
    maxLat = false
  }
  if ( Number(minLat) < -90 ) {
    error.errors.maxLat = "Minimum latitude is invalid"
    minLng = false
  }
  if ( Number(maxLng) > 180 ) {
    error.errors.maxLng = "Maximum longitude is invalid"
    maxLng = false
  }
  if ( Number(minLng) < -180 ) {
    error.errors.minLng = "Minimum longitude is invalid"
    minLng = false
  }
  if ( Number(minPrice) < 0 ) {
    error.errors.minPrice = "Maximum price must be greater than 0"
    minPrice = false
  }
  if ( Number(maxPrice ) < 0) {
    error.errors.maxPrice = "Minimum price must be greater than 0"
    maxPrice = false
  }

  if (  page < 0 || size < 0 || 
      (!maxLat && maxLat !== undefined ) || 
      ( !minLat && minLat !== undefined ) || 
      ( !maxLng && maxLng !== undefined ) || 
      ( !minLng && minLng !== undefined ) || 
      ( !minPrice && minPrice !== undefined ) || 
      ( !maxPrice && maxPrice !== undefined )
    ) {
      res.status(400);
      res.json(error);
  }

  if ( maxLat ) { 
    pagination.filter.push({ lat: { [Op.lte]: Number(maxLat) } })
  }
  if ( minLat ) { 
    pagination.filter.push({ lat: { [Op.gte]: Number(minLat) } })
  }
  if ( minLng ) { 
    pagination.filter.push({ lng: { [Op.gte]: Number(minLng) } })
  }
  if ( maxLng ) { 
    pagination.filter.push({ lng: { [Op.lte]: Number(maxLng) } })
  }
  if (minPrice) {
    pagination.filter.push({ price: { [Op.gte]: Number(minPrice) } })
  }
  if (maxPrice) {
    pagination.filter.push({ price: { [Op.lte]: Number(maxPrice) } })
  }

  pagination.size = size;
  pagination.page = page;

  const spots = await Spot.findAll({
    where: { [Op.and]: pagination.filter },
    limit: pagination.size,
    offset: pagination.size * pagination.page
  });

  res.json({
    spots,
    page: pagination.page,
    size: pagination.size,
  });

});

// Get all Spots owned by the current user
router.get('/', requireAuth, async ( req, res ) => {
  const spots = await Spot.findAll({
      where: { ownerId: req.user.id },
  });
  
  res.json( spots );

});

// Get details of a Spot from an id
router.get('/:id', async ( req,res ) => {
  const spotId = await Spot.findByPk( req.params.id, {
    include: [{ 
      model: Image, 
      as: 'images',
      attributes: [
        'url' 
      ]
    },{
      model: User,
      as: 'Owner',
      attributes: [
        'id', 
        'firstName', 
        'lastName'
      ]
    }]
  });

  if ( !spotId ) {
    return res.status(404).json({
      message: "Spot does not exist!",
      statusCode: 404,
    });
  }
  
  const reviews = await Spot.findByPk(req.params.id, {
    include: {
      model: Review,
      attributes: []
    },
    attributes: [
      [ sequelize.fn( 'COUNT', sequelize.col('*') ), 'numReviews' ],
      [ sequelize.fn( 'AVG', sequelize.col('stars') ), 'avgStarRating' ]
    ],
    raw: true
});

  const spotInfo = spotId.toJSON();
  spotInfo.numReviews = reviews.numReviews;
  spotInfo.avgStarRating = reviews.avgStarRating;

  res.json(spotInfo);

});

// GET all spots owned by the current user
router.get('/userSpots', requireAuth, async ( req, res ) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });

  res.json(places[0])
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/review', requireAuth, async ( req, res ) => {
  const spotId = req.params.spotId;
  
  reviewParams = req.body;
  reviewParams.spotId = spotId;
  reviewParams.userId = req.user.id;

  const currentSpot = await Spot.findByPk(spotId);

  if ( !currentSpot ) {
    return res.status(404).json({
      message: "Spot does not exist."
    });
  }

  let review = await Review.findAll({
    where: { spotId: spotId, userId: reviewParams.userId }
  });

  if ( review.length ) { 
    return res.status(403).json({
      message: "Review for spot already exists."
    });
  }

  try {
    review = await Review.create(reviewParams);
    review = await Review.findByPk(review.id);
    return res.json(review);
  } catch( error ) {
    return res.status(400).json({
      message: error.message
    });
  }

});

// Create a new Spot
router.post('/', requireAuth, validateSpot, async ( req, res ) => {
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
  });
 
  res.json({
    message: 'Successfully created spot', 
    newSpot
  });

});

// Edit a spot 
router.put('/:id', requireAuth, validateSpot, async ( req, res ) => {
  const spotId = await Spot.findByPk( req.params.id, {
    where: { ownerId: req.params.id }
  });

  let {address, city, state, country, lat, lng, name, description, price} = req.body;
  
  if ( !spotId ) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    })
  } else if ( spotId.ownerId !== req.user.id ) {
      return res.status(403).json({
        message:"Forbidden"
      })
  }
  
  spotId.address = address
  spotId.city = city
  spotId.state = state
  spotId.country = country
  spotId.lat = lat
  spotId.lng = lng
  spotId.name = name
  spotId.description = description
  spotId.price = price
  
  await spotId.save();
  return res.json(spotId);

});

// Add an Image to a Spot based on the Spot's id
router.post('/:id/images', restoreUser,  requireAuth, async ( req, res ) => {
  const spotId = req.params.spotId
  const spotImage = await Spot.findByPk(spotId);

  if( !spotImage ) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404
    });
  }

  if(req.user.id != spotImage.ownerId) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403
    });
  }
  
  const { url } = req.body;

  if( !url ) {
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

  newImage = spotImage.toJSON()
  delete newImage['spotId']
  delete newImage['reviewId']
  delete newImage['createdAt']
  delete newImage['updatedAt']

  res.status(200).json(newImage)
})

// Delete a spot
router.delete('/:id', async (req, res) => {
  const id = req.user.id;

  const spotId = req.params.spotId;
  const spot = await Review.findOne({
    where: { id : spotId }
  });

  if ( spot.userId !== id ) {
    return res.status(403).json({
      message: "Authorization Error"
    });
  }
  if ( !spot ) {
   return res.status(404).json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  await spot.destroy();
  await spot.save();

  return res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200,
  });

});

module.exports = router;
