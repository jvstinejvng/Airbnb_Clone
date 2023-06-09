const express = require('express')
const { requireAuth } = require('../../utils/auth');
const { Image, sequelize } = require('../../db/models');
const router = express.Router();

router.get('/', [requireAuth], async (req, res) => {
    const images = await Image.findAll()
    return res.json({ images })
})

router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const deleteImage = await Image.findOne({
        where: {
            id: req.params.imageId,
        }
    })

    if (!deleteImage) {
        const err = new Error(`Image couldn't be found`);
        err.status = 404;
        return next(err)
    } else if (deleteImage.userId !== req.user.id) {
        const err = new Error(`Image doesn't belong to the current user`);
        err.status = 403;
        return next(err)
    } else {
        deleteImage.destroy();
        res.status = 200;
        return res.json({
            message: "Successfully deleted",
            statusCode: res.status
        })
    }
})

module.exports = router;
