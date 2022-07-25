const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId", requireAuth, async (req, res) => {
  const { id } = req.user;
  const spotId = req.params.spotId;

  let currentBooking = await Spot.findByPk(spotId);

  if (!currentBooking) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (currentBooking.ownerId !== id) {
    currentBooking = await Booking.findAll({
      where: { spotId },
      attributes: ["spotId", "startDate", "endDate"],
    });
  } else {
    currentBooking = await Booking.findAll({
      where: { spotId },
      include: { model: User },
    });
  }

  res.json(currentBooking);
});

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
  let bookingId = req.params.bookingId;
  let bookingParams = req.body;
  let currentUserId = req.user.id;

  let booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return res.status(404).json({
      message: "Spot does not exist",
    });
  }

  if (booking.userId !== currentUserId) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if (booking.endDate < Date.now()) {
    return res.status(400).json({
      message: "You cannot edit a past booking",
      statusCode: 400,
    });
  }

  let currentBooking = await Booking.findAll({
    where: {
      id: {
        [Op.not]: bookingId, 
      },
      spotId: booking.spotId,
      [Op.and]: [
        {
          
          startDate: {
            [Op.lte]: bookingParams.endDate,
          },
        },
        {
          endDate: {
            [Op.gte]: bookingParams.startDate,
          },
        },
      ],
    },
  });

  if (currentBooking.length) {
    res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  booking = await Booking.update(bookingParams, {
    where: {
      id: bookingId,
    },
  });
  booking = await Booking.findByPk(bookingId);
  res.json(booking);
});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
  let currentUserId = req.user.id;

  let bookingId = req.params.bookingId;
  let currentBooking = await Booking.findByPk(bookingId);
  let spotId = await Spot.findByPk(currentBooking.spotId);

  if ( !currentBooking ) {
    res.status(404);
    res.json({
      message: "Booking does not exist",
    });
  }

  if ( currentBooking.userId !== currentUserId && spotId.ownerId !== currentUserId ) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  const { startDate } = currentBooking.toJSON();

  if ( new Date(startDate) < new Date() ) {
    return res.status(400).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 400,
    });
  }

  await currentBooking.destroy({
    where: { id: bookingId },
  });

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

});

module.exports = router;
