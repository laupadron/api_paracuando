const express = require('express');
const passport = require('../libs/passport');
const router = express.Router()
const { getUsers, getUserById, updateUserById, addInterest,removeInterest} = require('../controllers/users.controller')
const {checkRole, checkAdmin, checkSameUser} = require('../middlewares/checkers.middleware');

router.get('/', 
  passport.authenticate('jwt', { session: false }),
  checkRole, // se agrega al req el rol del usuario
  checkAdmin, // se agrega al req si es admin
  getUsers
); 

router.get('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkRole, // se agrega al req el rol del usuario
  checkSameUser, // se agrega al req si es el mismo usuario
  getUserById
); 

router.post('/:id', 
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  updateUserById
);

router.post('/:id/add-interest',
passport.authenticate('jwt', { session: false }),
  checkSameUser,
  addInterest
);

router.delete('/:id/remove-interest',
passport.authenticate('jwt', { session: false }),
  checkSameUser,
  removeInterest
)


module.exports = router