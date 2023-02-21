// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const userprofileRouter = require('./userprofiles.js')
const spotRouter = require('./spots.js')
const BoookingRouter = require('./bookings.js')
const reviewRouter = require('./reviews.js')
const imageRouter = require('./images.js')
const mapsRouter = require('./maps.js')

const { setTokenCookie } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// connect restoreUser middleware to the API router
// if current user session is valid, set req.user to the user in the database, otherwise set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/userprofiles', userprofileRouter)
router.use('/spots', spotRouter)
router.use('/bookings', BoookingRouter)
router.use('/reviews', reviewRouter)
router.use('/images', imageRouter)
router.use('/maps', mapsRouter)

// will test the restoreUser middleware and check whether or not the req.user key has been populated by the middleware properly
router.get(
    '/restore-user',
    (req, res) => {
        return res.json(req.user);
    }
);

// setTokenCookie will assign token to user
router.get('/set-token-cookie', async (_req, res) => {
    const user = await User.findOne({
        where: {
            email: 'demo@user.io'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user });
});


router.get('/require-auth', requireAuth,
    (req, res) => {
        return res.json(req.user);
    }
);

// router.post('/test', function (req, res) {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
