const router = require('express').Router();
const { User } = require('../../db/models');

const bookingsRouter = require('./bookings.js');
const imageRouter = require('./image.js');
const reviewsRouter = require('./reviews.js');
const sessionRouter = require('./session.js');
const spotsRouter = require('./spots.js');
const usersRouter = require('./users.js');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');

router.use( restoreUser );
router.use( '/bookings', bookingsRouter) ;
router.use( '/image', imageRouter );
router.use('/reviews', reviewsRouter );
router.use( '/session', sessionRouter );
router.use( '/spots', spotsRouter );
router.use( '/users', usersRouter );

// GET /api/set-token-cookie
router.get('/set-token-cookie', async ( _req, res ) => {
  const user = await User.findOne({
      where: { username: 'Demo-lition' }
    });

  setTokenCookie( res, user );

  return res.json({ user });

});

// GET /api/restore-user
router.get('/restore-user', ( req, res ) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get('/require-auth', requireAuth, ( req, res ) => {
    return res.json(req.user);
  }
);

// router.post('/test', function( req, res ) {
//   res.json({ requestBody: req.body });
// });

module.exports = router;

