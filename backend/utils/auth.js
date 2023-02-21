// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User, Spot, Review, Booking, Image } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// sets the JWT Cookie after user is logged in or signed up
// generates JWT using imported secret
const setTokenCookie = (res, user) => {
    // create the token
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";
    // set the token cookie (HTTP-only cookie)
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax"
    });
    return token;
};

// restoreUser will restore the session user based on the contents of the JWT cookie
const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
            // console.log(req.user)
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
// requires a session user to be authenticated before accessing a route
const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Authentication required');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
}

const checkSpotExists = async function (req, _res, next) {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err);
    } else {
        return next()
    }
}

const checkNotOwner = async function (req, _res, next) {
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    if (Object.keys(spot).length) {
        const err = new Error(`Hosts can't book their own listings`);
        err.status = 403;
        return next(err);
    } else {
        return next()
    }
}

const checkNotOwnerReviews = async function (req, _res, next) {
    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId,
            ownerId: req.user.id
        }
    })

    if (Object.keys(spot).length) {
        const err = new Error(`Hosts can't review their own listings`);
        err.status = 403;
        return next(err);
    } else {
        return next()
    }
}

const checkOwnerSpot = async function (req, _res, next) {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        },
        attributes: ['ownerId'],
        raw: true
    })

    if (!spot) {
        const err = new Error(`Spot couldn't be found`);
        err.status = 404;
        return next(err)
    } else if (spot.ownerId !== req.user.id) {
        const err = new Error(`Spot must belong to the current user`);
        err.status = 403;
        return next(err);
    } else {
        return next()
    }
}

const checkUserReview = async function (req, _res, next) {
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId,
        },
        attributes: ['userId'],
        raw: true
    })

    if (!review) {
        const err = new Error(`Review couldn't be found`);
        err.status = 404;
        return next(err)
    } else if (review.userId !== req.user.id) {
        const err = new Error(`Review must belong to the current user`);
        err.status = 403;
        return next(err)
    } else {
        return next()
    }
}

const checkReviewValidation = function (req, _res, next) {
    const { review, stars } = req.body;
    let errorResult = { errors: {} }

    if (review.length < 10 || review.length > 1000) errorResult.errors.review = 'Review must be between 10 and 1000 characters'
    if (stars < 1 || stars > 5) errorResult.errors.star = 'Rating must be between 1 to 5 stars'

    if (Object.keys(errorResult.errors).length) {
        const err = new Error('Validation Error');
        err.status = 400;
        err.errors = errorResult.errors
        return next(err)
    } else {
        return next()
    }
}

const checkBookingValidation = async function (req, _res, next) {
    const { startDate, endDate } = req.body;
    let errorResult = { errors: {} }

    const allBookings= await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ['userId', 'startDate', 'endDate'],
        raw: true
    })

    let currStartDates = []
    let currEndDates = []

    for (let i = 0; i < Object.keys(allBookings).length; i++) {
        currStartDates.push(allBookings[i].startDate)
        currEndDates.push(allBookings[i].endDate)
    }

    for (let i = 0; i < currStartDates.length; i++) {
        let startRes = new Date(currStartDates[i]).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        let endRes = new Date(currEndDates[i]).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

        let startReq = new Date(startDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
        let endReq = new Date(endDate).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

        if ((startReq > startRes && startReq < endRes) ||
            (endReq > startRes && endReq < endRes) ||
            startRes > startReq && startRes < endReq ||
            (endRes > startReq && endRes < endReq)) {
            errorResult.errors.date = `Dates conflicts with an existing Booking`
        } else if (startRes === startReq) {
            errorResult.errors.startDate = 'Check-in date conflicts with an existing Booking'
        } else if (endRes === endReq) {
            errorResult.errors.endDate = 'Check-out date conflicts with an existing Booking'
        }
    }

    if (Object.keys(errorResult.errors).length) {
        const err = new Error(`Sorry, this spot is already booked for the specified dates`);
        err.status = 403;
        err.errors = errorResult.errors
        return next(err)
    } else {
        return next()
    }
}

const checkMaxImagesReviews = async function (req, _res, next) {
    const totalImagesReviews = await Image.findAll({
        where: { reviewId: req.params.reviewId },
        raw: true
    })

    if (Object.keys(totalImagesReviews).length >= 10) {
        const err = new Error(`Maximum number of images for this resource was reached`);
        err.status = 400;
        return next(err)
    } else {
        return next()
    }
}

const checkMaxImagesSpots = async function (req, _res, next) {
    const totalImagesSpots = await Image.findAll({
        where: { spotId: req.params.spotId },
        raw: true
    })

    if (Object.keys(totalImagesSpots).length >= 10) {
        const err = new Error(`Maximum number of images for this resource was reached`);
        err.status = 400;
        return next(err)
    } else {
        return next()
    }
}

module.exports = {
    setTokenCookie,
    restoreUser,
    requireAuth,
    checkSpotExists,
    checkNotOwner,
    checkNotOwnerReviews,
    checkOwnerSpot,
    checkUserReview,
    checkReviewValidation,
    checkBookingValidation,
    checkMaxImagesReviews,
    checkMaxImagesSpots
};
