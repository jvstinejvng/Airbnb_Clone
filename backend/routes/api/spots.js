const express = require("express");
const { Op } = require("sequelize");
const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { Booking,Review, Image, Spot, User, sequelize } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();



// get all spots owned by the current user
router.get("/your-spots", requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    where: { ownerId: req.user.id },
  });

  res.json(allSpots);
});

// get details of a Spot from an id
router.get("/:id", async (req, res) => {
  const spot = await Spot.findByPk(req.params.id);
  const numReviews = await Review.count({
      where: { spotId: req.params.id }
  });
  const ratings = await Review.findAll({
      where: { spotId: req.params.id },
      attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']]
  });
  const images = await Image.findAll({
      where: { spotId: req.params.id },
      attributes: ['id', 'url']
  });
  const owners = await User.findByPk(spot.ownerId, {
      attributes: ['id', 'firstName', 'lastName']
  });

  const data = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      previewImage: spot.previewImage,
      numReviews,
      avgStarRating: parseFloat(ratings[0].dataValues.avgStarRating),
      images,
      Owners: owners
  }
  return res.json(data);
});

// create a spot
router.post("/", requireAuth, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = req.body;

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!address) error.errors.address = "Street address is required";
  if (!city) error.errors.city = "City is required";
  if (!state) error.errors.state = "State is required";
  if (!country) error.errors.country = "Country is required";
  if (!lat) error.errors.lat = "Latitude is not valid";
  if (!lng) error.errors.lng = "Longitude is not valid";
  if (!name) error.errors.name = "Name must be less than 50 characters";
  if (!description) error.errors.description = "Description is required";
  if (!price) error.errors.price = "Price per day is required";

  if (
    !address ||
    !city ||
    !state ||
    !country ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price
  ) {
    res.statusCode = 400;
    return res.json(error);
  }

  const spot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    previewImage,
    price,
  });

  res.json(spot);
});

// get spot reviews 
router.get('/:spotId/reviews', async (req, res) => {
  let currentSpotReviews = await Spot.findByPk(req.params.spotId);

  const spotId = req.params.spotId

if (!currentSpotReviews) {
  return res.status(404).json({
    "message": "Spot could not be found",
    "statusCode": 404
  });
}

let currentReviews = await Review.findAll({
  where: {spotId: spotId,},
    include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Image, attributes: ['url'] }
      ],
  },
);

return res.json(currentReviews);
});

// edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = req.body;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  if (!address) error.errors.address = "Street address is required";
  if (!city) error.errors.city = "City is required";
  if (!state) error.errors.state = "State is required";
  if (!country) error.errors.country = "Country is required";
  if (!lat) error.errors.lat = "Latitude is not valid";
  if (!lng) error.errors.lng = "Longitude is not valid";
  if (!name) error.errors.name = "Name must be less than 50 characters";
  if (!description) error.errors.description = "Description is required";
  if (!price) error.errors.price = "Price per day is required";

  if (
    !address ||
    !city ||
    !state ||
    !country ||
    !lat ||
    !lng ||
    !name ||
    !description ||
    !price
  ) {
    res.statusCode = 400;
    return res.json(error);
  }

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  });
  res.json(spot);
});

// delete a spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const currentSpot = await Spot.findByPk(spotId);

  if (!currentSpot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  currentSpot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

// get all spots
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  return res.json({ spots: spots });
});



// add query filters to get all spots
router.get("/", async (req, res) => {
  const pagination = {
    filter: [],
  };
  let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } =
    req.query;
  const error = {
    message: "Validation Error",
    statusCode: 400,
    errors: {},
  };

  page = Number(page);
  size = Number(size);

  if (Number.isNaN(page)) page = 0;
  if (Number.isNaN(size)) size = 20;

  if (page > 10) page = 10;
  if (size > 20) size = 20;

  if (page < 0) error.errors.page = "Page must be greater than or equal to 0";
  if (size < 0) error.errors.size = "Size must be greater than or equal to 0";
  if (Number(maxLat) > 90) {
    error.errors.maxLat = "Maximum latitude is invalid";
    maxLat = false;
  }
  if (Number(minLat) < -90) {
    error.errors.maxLat = "Minimum latitude is invalid";
    minLng = false;
  }
  if (Number(maxLng) > 180) {
    error.errors.maxLng = "Maximum longitude is invalid";
    maxLng = false;
  }
  if (Number(minLng) < -180) {
    error.errors.minLng = "Minimum longitude is invalid";
    minLng = false;
  }
  if (Number(minPrice) < 0) {
    error.errors.minPrice = "Maximum price must be greater than 0";
    minPrice = false;
  }
  if (Number(maxPrice) < 0) {
    error.errors.maxPrice = "Minimum price must be greater than 0";
    maxPrice = false;
  }

  if (
    page < 0 ||
    size < 0 ||
    (!maxLat && maxLat !== undefined) ||
    (!minLat && minLat !== undefined) ||
    (!maxLng && maxLng !== undefined) ||
    (!minLng && minLng !== undefined) ||
    (!minPrice && minPrice !== undefined) ||
    (!maxPrice && maxPrice !== undefined)
  ) {
    res.status(400);
    res.json(error);
  }

  if (maxLat) {
    pagination.filter.push({
      lat: { [Op.lte]: Number(maxLat) },
    });
  }
  if (minLat) {
    pagination.filter.push({
      lat: { [Op.gte]: Number(minLat) },
    });
  }
  if (minLng) {
    pagination.filter.push({
      lng: { [Op.gte]: Number(minLng) },
    });
  }
  if (maxLng) {
    pagination.filter.push({
      lng: { [Op.lte]: Number(maxLng) },
    });
  }
  if (minPrice) {
    pagination.filter.push({
      price: { [Op.gte]: Number(minPrice) },
    });
  }
  if (maxPrice) {
    pagination.filter.push({
      price: { [Op.lte]: Number(maxPrice) },
    });
  }

  pagination.size = size;
  pagination.page = page;

  const spots = await Spot.findAll({
    where: {
      [Op.and]: pagination.filter,
    },
    limit: pagination.size,
    offset: pagination.size * pagination.page,
  });
  res.json({
    spots,
    page: pagination.page,
    size: pagination.size,
  });
});

module.exports = router;
