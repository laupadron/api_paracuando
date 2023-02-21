const express = require('express');
const { updateTagById, deleteTagById } = require('../controllers/tags.controller');
const passport = require('../libs/passport');
const router = express.Router()
const {checkRole, checkAdmin} = require('../middlewares/checkers.middleware');

router.post('/:id',
  passport.authenticate('jwt', { session: false }), 
  checkRole,
  checkAdmin,
  updateTagById
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }), 
  checkRole,
  checkAdmin,
  deleteTagById
);



module.exports = router