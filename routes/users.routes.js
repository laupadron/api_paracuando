const express = require('express');
const passport = require('../libs/passport');
const router = express.Router()
const { getUsers, getUserById, updateUserById } = require('../controllers/users.controller')
const {checkAdminRole} = require('../middlewares/checkRole.middleware');
const { checkSameUser } = require('../middlewares/checkSameUser.middleware');

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  checkAdminRole, 
  getUsers
); 

router.get('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  getUserById
); 

router.post('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  updateUserById
);


module.exports = router