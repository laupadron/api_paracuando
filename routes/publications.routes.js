const express = require('express');
const passport = require('../libs/passport');
const router = express.Router();
const { checkRole, checkAdmin, checkSameUser, checkPublicationOwner } = require('../middlewares/checkers.middleware');
const { getPublications, getPublicationById, createPublication, deletePublication, addVote } = require('../controllers/publications.controller');
const { uploadImagePublication, destroyImageByPublication, changeImageOrder } = require('../controllers/publications_images.controllers')
const { multerPublicationsPhotos } = require('../middlewares/multer.middleware')

router.get('/',
  getPublications
);

router.post('/',
  passport.authenticate('jwt', { session: false }),
  createPublication
);

router.get('/:id',
  getPublicationById
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  checkRole,
  deletePublication
);

router.post('/:id/vote',
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  addVote,

);

router.post('/:id/add-image',
  passport.authenticate('jwt', { session: false }),
  checkPublicationOwner,
  checkRole,
  multerPublicationsPhotos.array('image', 3),
  uploadImagePublication
)

router.delete('/:id/remove-image/:order',
  passport.authenticate('jwt', { session: false }),
  checkPublicationOwner,
  checkRole,
  destroyImageByPublication
);

router.put('/:id/image-order',
  passport.authenticate('jwt', { session: false }),
  checkPublicationOwner,
  checkRole,
  changeImageOrder
)

module.exports = router;