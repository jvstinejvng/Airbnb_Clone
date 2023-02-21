// backend/routes/api/reviews.js
const { Op } = require('sequelize');
const express = require('express')
const { requireAuth, checkUserReview, checkReviewValidation } = require('../../utils/auth');
const { Review, sequelize } = require('../../db/models');
const router = express.Router();

router.put('/:reviewId', [requireAuth, checkReviewValidation, checkUserReview], async (req, res) => {
    const { review, stars } = req.body;

    const updateReview = await Review.findOne({
        where: {
            id: req.params.reviewId,
        }
    })

    updateReview.review = review;
    updateReview.stars = stars;
    await updateReview.save();
    return res.json(updateReview)
})


router.delete('/:reviewId', [requireAuth, checkUserReview], async (req, res) => {
    const deleteReview = await Review.findOne({
        where: {
            id: req.params.reviewId,
        }
    })

    deleteReview.destroy();
    res.status = 200;
    return res.json({
        message: "Successfully deleted",
        statusCode: res.status
    })
})

module.exports = router;
