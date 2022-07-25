const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");

const router = express.Router();

// Add an Image to a Spot based on the Spot's id
router.post("/spots/:spotId", requireAuth, async (req, res) => {
  const { url } = req.body;
  const spotId = await Spot.findByPk(req.params.spotId, {
    where: { ownerId: req.user.id },
  });

  if (!spotId) {
    return res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const images = await Image.findAll({
    where: {
      [Op.and]: [
        { spotId: req.params.spotId }, 
        { imageableType: "Spot" }],
    },
  });

  const newImage = await Image.create({
    imageableId: images.length + 1,
    imageableType: "Spot",
    url,
  });

  res.json(newImage);

})

// Delete an Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const deleteImg = await Image.findByPk(req.params.id);

  if (!deleteImg ) {
    res.status(404);
    res.json({
      message: "Image couldn't be found",
      statusCode: 404,
    });
  }
  if ( deleteImg.userId !== req.user.id ) {
    res.status(403);
    res.json({
      message: "Image must belong to the current user",
      statusCode: 403,
    });
  }

  deleteImg.destroy();
  deleteImg.save();

  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });

})

module.exports = router;
