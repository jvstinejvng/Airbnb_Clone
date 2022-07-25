const express = require('express');
const {Op} = require('sequelize');

const { Booking, Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async ( req, res ) => {
  const { id } = req.user;

  const allBookings = await Booking.findAll({
    where: { userId: id },
    include: {
      model: Spot,
      attributes: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'price',
        'previewImage',
      ],
    },
  });

  res.json( allBookings );

});

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId', requireAuth, async ( req, res ) => {
  const { id } = req.user;

  let allBookings = await Spot.findByPk( req.params.spotId );

  if ( !allBookings ) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if ( allBookings.ownerId !== id ) {
    allBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      attributes: [
        'spotId', 
        'startDate', 
        'endDate',
      ],
    });
  } else {
    allBookings = await Booking.findAll({
      where: { spotId: req.params.spotId },
      include: { model: User },
    });
  }

  res.json( allBookings );

});

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId', requireAuth, async (req, res) => {
  const spotId = req.params.spotId;

  bookingParams = req.body;
  bookingParams.spotId = spotId;
  bookingParams.userId = req.user.id;

  let spot = await Spot.findByPk( spotId );

  if ( !spot ) {
    return res.status(404).json({
      message: "Spot couldn't be found!",
    });
  }

  if ( bookingParams.userId === spot.ownerId ) {
    return res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  if ( bookingParams.endDate <= bookingParams.startDate ) {
    return res.status(400).json({
      message: 'Validation error',
      statusCode: 400,
      errors: { 
        endDate: "endDate cannot come before startDate" 
      },
    });
  }

  let booking = await Booking.findAll({
    where: { spotId: spotId,
      [Op.and]: [
        { startDate: { [Op.lte]: bookingParams.endDate } },
        { endDate: { [Op.gte]: bookingParams.startDate } },
      ],
    },
  });

  if ( booking.length ) {
    return res.status(403).json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }

  let newBooking = await Booking.create( bookingParams );
  newBooking = await Booking.findByPk( newBooking.id );

  return res.json( newBooking );

});

// Edit a Booking
router.put('/:id', requireAuth, async ( req, res ) => {
  const { startDate, endDate } = req.body;

  const booking = await Booking.findOne({
      where: { id: req.params.id }
  });

  if ( !booking ) {
  return res.status(404).json({
      message: "Booking couldn't be found",
      statusCode: 404,
    });
  }

 if ( booking.userId !== req.user.id ) {
  return res.status(403).json({
    message: 'Forbidden',
    statusCode: 403,
  });
 }

  if ( new Date( booking.endDate ) < new Date() ) {
    return res.status(400).json({
      message: "Past bookings can't be modified",
      statusCode: 400,
    });
  }

  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  return res.json(booking);

});

// Delete a Booking
router.delete('/:bookingId', requireAuth, async ( req, res ) => {
  let user = req.user.id;

  let bookingId = req.params.bookingId;
  let booking = await Booking.findByPk(bookingId);
  let spotId = await Spot.findByPk(booking.spotId);

  if ( !booking ) {
    return res.status(404).json({
      message: "Booking does not exist",
      statusCode: 404,
    });
  }

  if ( booking.userId !== user && spotId.ownerId !== user ) {
    return res.status(403).json({
      message: 'Forbidden',
      statusCode: 403,
    });
  }

  const { startDate } = booking.toJSON();

  if ( new Date(startDate) < new Date() ) {
    return res.status(400).json({
      message: "Bookings that have been started can't be deleted",
      statusCode: 400,
    });
  }

  await booking.destroy({
    where: { id: bookingId },
  });

  return res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200
  });

});

module.exports = router;