const express = require('express');
const passport = require('../libs/passport');
const router = express.Router();
const { checkRole, checkAdmin, checkSameUser } = require('../middlewares/checkers.middleware');
const { getPublications, getPublicationById,createPublication, deletePublication, addVote } = require('../controllers/publications.controller');
const{uploadImagePublication,destroyImageByPublication}=require('../controllers/publications_images.controllers')
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
  deletePublication);

router.post('/:id/vote',
  passport.authenticate('jwt', { session: false }),
  checkSameUser,
  addVote,
  
);

// router.route('/:idPublication/images')
//   .get(getUrlAllImagesByPublication)
//   .post(passportJWT.authenticate('jwt', { session: false }), userOwnPublicationOrAdmin, multerPublicationsPhotos.array('image', 3), uploadImagePublication)
//   .delete(passportJWT.authenticate('jwt', { session: false }), userOwnPublicationOrAdmin, destroyAllImagesByPublication)

// router.route('/:idPublication/images/:idImage')
//   .get(getFileImageByPublication)
//   .delete(passportJWT.authenticate('jwt', { session: false }), userOwnPublicationOrAdmin, destroyImageByPublication)

router.post('/:id/add-image',
passport.authenticate('jwt', { session: false }),
checkSameUser,
checkRole,
multerPublicationsPhotos.array('image'), 
uploadImagePublication
)

router.delete('/:id/remove-image/:order',
passport.authenticate('jwt', { session: false }),
checkSameUser,
checkRole,

destroyImageByPublication
)
module.exports = router;