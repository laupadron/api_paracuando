const express = require('express');
const { getStates } = require('../controllers/states.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  getStates
);



module.exports = router