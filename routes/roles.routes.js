const express = require('express');
const { getRoles } = require('../controllers/roles.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  getRoles
);



module.exports = router