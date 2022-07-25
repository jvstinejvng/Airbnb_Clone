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

// Get all Reviews by a Spot's id


// GET all spots owned by the current user
router.get('/userSpots', requireAuth, async (req, res) => {
    const { id } = req.user

      const places = await Spot.findAll({
          where: {ownerId: id}
      });

  res.json(places[0])
});

//  Create a Review for a Spot based on the Spot's id


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


// Delete a spot
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
      statusCode: 200
    });
  });


module.exports = router;
