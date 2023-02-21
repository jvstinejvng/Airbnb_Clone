const express = require('express')
const router = express.Router();

const { mapsAPIKey } = require('../../config')

router.post('/key', async (req, res) => {
  res.json({ mapsAPIKey })
})

module.exports = router;
