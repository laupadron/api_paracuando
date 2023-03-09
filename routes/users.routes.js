const express = require('express');
const passport = require('../libs/passport');
const router = express.Router()
const { getUsers, getUserById, updateUserById, getUserVotes, getUserPublications, addInterest, removeInterest,addImageUser } = require('../controllers/users.controller')
const { checkRole, checkAdmin, checkSameUser } = require('../middlewares/checkers.middleware');
const { multerUserssPhotos } = require('../middlewares/multer.middleware') 
const {uploadImageUsers} = require('../controllers/users_images.controller')

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

router.get('/:id/votes',
  passport.authenticate('jwt', { session: false }),
  getUserVotes
);

router.get('/:id/publications',
  passport.authenticate('jwt', { session: false }),
  getUserPublications
);

router.put('/:id',
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
);

router.post('/:id/add-image',
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  multerUserssPhotos.single('image'),
  uploadImageUsers
)



module.exports = router