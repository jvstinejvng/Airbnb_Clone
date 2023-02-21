// backend/routes/api/bookings.js
const { Op } = require('sequelize');
const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Spot, Booking, Image, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    const Bookings = await Booking.findAll({
        // where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: { exclude: ['numReviews', 'avgStarRating', 'createdAt', 'updatedAt'] },
                include: [
                    {
                        model: Image,
                        as: 'images',
                        attributes: ['url']
                    }
                ]
            }
        ]
    })
    return res.json({ 'Bookings': Bookings })
})

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const deleteBooking = await Booking.findOne({
        where: {
            id: req.params.bookingId,
        },
    })

    let today = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })

    if (!deleteBooking) {
        const err = new Error(`Reservation couldn't be found`);
        err.status = 404;
        return next(err)
    } else if (new Date(deleteBooking.startDate) < today) {
        const err = new Error(`Bookingsthat have been started can't be deleted`);
        err.status = 404;
        return next(err)
    } else {
        await deleteBooking.destroy();
        res.status = 200;
        return res.json({
            message: "Successfully deleted",
            statusCode: res.status
        })
    }
})

module.exports = router;
