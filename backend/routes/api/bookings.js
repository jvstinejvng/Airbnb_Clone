const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const { id } = req.user;
  
  let allBookings = await Spot.findByPk(spotId);
  
  if ( !allBookings ) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    })
  }
  
  if ( allBookings.ownerId !== id ) {
    allBookings = await Booking.findAll({
      attributes: [
        "spotId", 
        "startDate", 
        "endDate",
      ],
      where: { spotId },
    });
  } else {
    allBookings = await Booking.findAll({
      include: { model: User },
        where: { spotId }
    });
  }
  
  res.json(allBookings);

});

// Edit a Booking
router.put('/:id', requireAuth, async (req, res) => {
  let currentUserId = req.user.id;

  let bookId = req.params.bookingId;
  let bookParam = req.body;
  let booking = await Booking.findByPk( bookId );

  if ( !booking ) {
    return res.status(404).json({
        message: "Booking couldn't be found",
        statusCode: 404,
      })
    }

  if ( booking.userId !== currentUserId ) {
    return res.status(403).json({
      "message": "Forbidden",
      "statusCode": 403,
    })
   }

  if ( booking.endDate < Date.now() ) {
    return res.status(400).json({
      message: "You cannot edit a past booking",
      statusCode: 400,
    });
  }

  let currentBooking = await Booking.findAll({
    where: { 
      id: { [Op.not]: bookId, },
      spotId: booking.spotId,
      [Op.and]: [
        {
          startDate: { [Op.lte]: bookParam.endDate,},
        },
        { 
          endDate: { [Op.gte]: bookParam.startDate, },
        },
      ],},
  });

  if ( currentBooking.length ) {
    res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  booking = await Booking.update(bookParam, {
    where: { id: bookId, },
  });

  booking = await Booking.findByPk(bookId);

  res.json(booking);

});

// Delete a Booking
router.delete('/:id', requireAuth, async (req, res) => {
  let userId = req.user.id;

  let bookId = req.params.bookingId;
  let currentBooking = await Booking.findByPk(bookId);

  let spot = await Spot.findByPk(currentBooking.spotId);

  if ( !currentBooking ) {
      res.status(404);
      return res.json({
          "message": "Booking could not be found",
          "statusCode": 404,
      })
  }

  if ( currentBooking.userId !== userId && spot.ownerId !== userId ) {
      res.status(403);
      return res.json({
          "message": "Forbidden",
          "statusCode": 403,
      })
  }

  if ( new Date(currentBooking.startDate) < Date.now() ) {
      res.status(400);
      return res.json({
          "message": "You cannot delete a past or current booking",
          "statusCode": 400,
      })
  }

  await currentBooking.destroy({
      where: { id: bookId }
  });

  return res.json({
      message: "Successfully deleted",
      statusCode: 200,
  });

});

module.exports = router;
