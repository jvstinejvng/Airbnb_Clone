const express = require('express');
const { Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// Delete an Image
router.delete('/:imageId', requireAuth, async ( req, res ) => {
  const image = await Image.findByPk( req.params.imageId );

  if ( !image ) {
    return res.status(404).json({
      message: "Image couldn't be found",
      statusCode: 404,
    });
  }

  if ( image.imageableId !== req.user.id ) {
    return res.status(403).json({
      message: 'Image must belong to current user in order to delete',
      statusCode: 403,
    });
  }

  image.destroy();
  image.save();

  return res.status(200).json({
    message: 'Successfully deleted',
    statusCode: 200,
  });

});

module.exports = router;
