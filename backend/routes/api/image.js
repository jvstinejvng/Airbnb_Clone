const express = require('express');

const { Booking, Image, Review, Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

const router = express.Router();

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
