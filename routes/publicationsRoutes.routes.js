const express = require('express');
const { getPublications } = require('../controllers/publications.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  getPublications
);



module.exports = router