const express = require('express');
const { getCities } = require('../controllers/cities.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  getCities
);



module.exports = router