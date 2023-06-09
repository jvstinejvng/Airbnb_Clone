const { Op } = require('sequelize');
const express = require('express')
const { requireAuth,
    checkSpotExists,
    checkNotOwner,
    checkNotOwnerReviews,
    checkOwnerSpot,
    checkUserReview,
    checkReviewValidation,
    checkBookingValidation,
    checkMaxImagesSpots,
    checkMaxImagesReviews } = require('../../utils/auth');
const { User, Spot, Review, Booking, Image, sequelize } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const router = express.Router();

const validateDate = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDate()
        .withMessage('Valid start date is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isDate()
        .withMessage('Valid end date is required'),
    handleValidationErrors
]

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom(async function checkName(name) {
            if (name.length > 50) {
                throw Error
            }
        })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

router.post('/:spotId/reviews/:reviewId/images', [requireAuth, checkUserReview, checkMaxImagesReviews], async (req, res) => {
    const { url } = req.body

    const newImage = await Image.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        reviewId: req.params.reviewId,
        type: 'review',
        url: url
    })

    return res.json(newImage)
})

router.post('/:spotId/images', [requireAuth, checkOwnerSpot, checkMaxImagesSpots], async (req, res) => {
    const { url } = req.body

    const newImage = await Image.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        type: 'spot',
        url: url
    })

    return res.json(newImage)
})

router.get('/:spotId/reviews', checkSpotExists, async (req, res) => {
    const spotReviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
        }, {
            model: Image,
            as: 'images',
            attributes: ['url']
        }]
    })
    return res.json({ 'Review': spotReviews })
})

router.post('/:spotId/reviews', [requireAuth, checkSpotExists, checkNotOwnerReviews, checkReviewValidation], async (req, res, next) => {
    const { review, stars } = req.body;

    const userReviews = await Review.findAll({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        },
        raw: true
    })

    if (Object.keys(userReviews).length) {
        const err = new Error(`User already has a review for this spot`);
        err.status = 403;
        return next(err);
    } else {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review: review,
            stars: stars
        })
        return res.json(newReview)
    }
})

router.get('/:spotId/Bookings', [requireAuth, checkSpotExists], async (req, res) => {

    const allBookings= await Booking.findAll({
        where: { spotId: req.params.spotId },
    })

    const ownerBookings= await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    const currentSpot = await Spot.findByPk(req.params.spotId, {
        where: { ownerId: req.user.id },
        attributes: ['ownerId'],
    })

    if (currentSpot.ownerId === req.user.id) {
        return res.json({ 'Bookings': ownerBookings})
    } else {
        return res.json({ 'Bookings': allBookings})
    }
})

router.post('/:spotId/Bookings', [requireAuth, checkSpotExists, checkNotOwner, validateDate, checkBookingValidation], async (req, res, next) => {
    const { startDate, endDate } = req.body;

    // if (new Date(startDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) > new Date(endDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })) {
    if (startDate > endDate) {
        const err = new Error(`Check-in date must be prior to check-out date`);
        err.status = 400;
        return next(err);
    } else if (startDate === endDate) {
        const err = new Error(`Bookingsmust be minimum of 1 day`);
        err.status = 400;
        return next(err);
    } else {
        const newBooking = await Booking.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            startDate: startDate,
            endDate: endDate,
        })
        return res.json(newBooking)
    }
})

router.put('/:spotId/Bookings/:bookingId', [requireAuth, checkSpotExists, checkNotOwner, validateDate], async (req, res, next) => {
    const { startDate, endDate } = req.body;

    let errorResult = { errors: {} }

    const allBookings= await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ['userId', 'startDate', 'endDate'],
        raw: true
    })

    let currStartDates = [];
    let currEndDates = [];
    let bookingUser = [];

    for (let i = 0; i < Object.keys(allBookings).length; i++) {
        currStartDates.push(allBookings[i].startDate)
        currEndDates.push(allBookings[i].endDate)
        bookingUser.push(allBookings[i].userId)
    }

    const currentbooking = await Booking.findOne({
        where: {
            spotId: req.params.spotId,
            id: req.params.bookingId,
            userId: req.user.id
        }
    })

    if (!currentbooking) {
        const err = new Error(`Booking couldn't be found`);
        err.status = 404;
        return next(err);
    } else if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
        const err = new Error(`Past bookings can't be modified`);
        err.status = 400;
        return next(err);
    } else if (new Date(startDate) > new Date(endDate)) {
        const err = new Error(`End date must be after start date`);
        err.status = 400;
        return next(err);
    } else {
        currentbooking.startDate = startDate;
        currentbooking.endDate = endDate;
    }

    for (let i = 0; i < currStartDates.length; i++) {
        let userBooked = bookingUser[i]
        let startRes = new Date(currStartDates[i]);
        let endRes = new Date(currEndDates[i]);

        let startReq = new Date(currentbooking.startDate)
        let endReq = new Date(currentbooking.endDate)

        if (userBooked !== req.user.id) {
            if ((startReq >= startRes && startReq < endRes) ||
                (endReq > startRes && endReq <= endRes) ||
                startRes >= startReq && startRes < endReq ||
                endRes > startReq && endRes <= endReq) {
                errorResult.errors.date = `Dates conflicts with an existing booking`
            } else if (startRes === startReq) {
                errorResult.errors.startDate = 'Start date conflicts with an existing booking'
            } else if (endRes === endReq) {
                errorResult.errors.endDate = 'End date conflicts with an existing booking'
            }
        }
    }

    if (Object.keys(errorResult.errors).length) {
        const err = new Error(`Sorry, this spot is already booked for the specified dates`);
        err.status = 403;
        err.errors = errorResult.errors
        return next(err)
    } else {
        currentbooking.save()
        return res.json(currentbooking)
    }
})

router.get('/:spotId', checkSpotExists, async (req, res) => {
    const spots = await Spot.unscoped().findByPk(req.params.spotId,
        {
            include: [
                {
                    model: Image,
                    as: 'images',
                    attributes: ['url']
                }, {
                    model: User,
                    as: 'Owner',
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Review,
                }
            ],
        })

    const reviewAggregate = await Spot.findByPk(req.params.spotId, {
        include: {
            model: Review,
            attributes: []
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
            [sequelize.fn('COUNT', sequelize.col('*')), 'numReviews'],
        ],
        raw: true
    })

    const spotData = spots.toJSON()
    spotData.avgStarRating = reviewAggregate.avgStarRating
    spotData.numReviews = reviewAggregate.numReviews
    return res.json(spotData)
})

router.post('/', [requireAuth, validateSpot], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, category, type, pets, yard, children, personalpets } = req.body;

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price,
        category: category,
        type: type,
        pets: pets,
        yard: yard, 
        children: children, 
        personalpets: personalpets, 
    })
    return res.json(newSpot);
})

router.put('/:spotId', [requireAuth, checkOwnerSpot, validateSpot], async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price, category, type,pets, yard, children, personalpets } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;
    spot.category = category;
    spot.type = type;
    spot.pets = pets;
    spot.yard = yard;
    spot.children = children;
    spot.personalpets = personalpets;

    await spot.save();
    return res.json(spot);
})

router.delete('/:spotId', [requireAuth, checkOwnerSpot], async (req, res) => {
    const deleteSpot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    await deleteSpot.destroy();
    res.status = 200;
    return res.json({
        message: "Successfully deleted",
        statusCode: res.status
    })
})

router.get('/', async (req, res, next) => {
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, country } = req.query;

    const pagination = {}
    const results = {}
    const spotQuery = {};

    const errorResult = { errors: {} }

    page = req.query.page === undefined ? 0 : parseInt(req.query.page)
    size = req.query.size === undefined ? 40 : parseInt(req.query.size)

    if (!Number.isNaN(page) && !Number.isNaN(size)) {
        if (page < 0) {
            errorResult.errors.page = 'Page must be greater than or equal to 0'
        } else if (size < 0) {
            errorResult.errors.size = 'Size must be greater than or equal to 0'
        } else if (page <= 10 && size <= 40) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        } else if (size > 40) {
            pagination.limit = 40;
            pagination.offset = 40 * (page - 1)
        } else if (page > 10) {
            pagination.limit = size;
            pagination.offset = size * (9)
        }
    }

    if (pagination.offset < 0) pagination.offset = 0;

    if (minLat) {
        if ((minLat - Math.floor(minLat)) !== 0) spotQuery.lat = { [Op.gte]: minLat }
        else errorResult.errors.minLat = 'Minimum latitude is invalid'
    }

    if (maxLat) {
        if ((maxLat - Math.floor(maxLat)) !== 0) spotQuery.lat = { [Op.lte]: maxLat }
        else errorResult.errors.maxLat = 'Maximum latitude is invalid'
    }

    if (minLng) {
        if ((minLng - Math.floor(minLng)) !== 0) spotQuery.lng = { [Op.gte]: minLng }
        else errorResult.errors.minLng = 'Minimum longitude is invalid'
    }

    if (maxLng) {
        if ((maxLng - Math.floor(maxLng)) !== 0) spotQuery.lng = { [Op.lte]: maxLng }
        else errorResult.errors.maxLng = 'Maximum longitude is invalid'
    }

    if (minPrice) {
        if (minPrice > 0) spotQuery.price = { [Op.gte]: minPrice }
        else errorResult.errors.minPrice = 'Minimum price must be greater than 0'
        // if (minPrice.includes('.0')) spotQuery.price = { [Op.gte]: minPrice }
        // else if ((minPrice - Math.floor(minPrice)) !== 0) spotQuery.price = { [Op.gte]: minPrice }
        // else errorResult.errors.minPrice = 'Minimum price must be a decimal'
    }

    if (maxPrice) {
        if (maxPrice > 0) spotQuery.price = { [Op.lte]: maxPrice }
        else errorResult.errors.maxPrice = 'Maximum price must be greater than 0'
        // if (maxPrice.includes('.0')) spotQuery.price = { [Op.lte]: maxPrice }
        // else if ((maxPrice - Math.floor(maxPrice)) !== 0) spotQuery.price = { [Op.lte]: maxPrice }
        // else errorResult.errors.minPrice = 'Maximum price must be a decimal'
    }

    if (country && country !== "") {
        spotQuery.country = { [Op.substring]: country };
    }

    results.Spots = await Spot.unscoped().findAll({
        where: spotQuery,
        include: [
            {
                model: Image,
                as: 'images',
                attributes: ['url'],
                limit: 1
            },
            {
                model: Review,
                attributes: ['stars']
            }
        ],
        ...pagination,
    })

    results.page = page || 0;
    results.size = size || 40

    if (Object.keys(errorResult.errors).length) {
        const err = new Error('Validation Error');
        err.status = 400;
        err.errors = errorResult.errors
        return next(err)
    } else {
        return res.json(results)
    }
})

module.exports = router;
