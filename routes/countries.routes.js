const express = require('express');
const { getCountries } = require('../controllers/countries.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  getCountries
);



module.exports = router