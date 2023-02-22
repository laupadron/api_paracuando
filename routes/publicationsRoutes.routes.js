const express = require('express');
const { getPublications } = require('../controllers/publications.controller');
const passport = require('../libs/passport');
const router = express.Router()

router.get('/',
  getPublications
);



module.exports = router