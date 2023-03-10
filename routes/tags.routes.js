const express =require('express');
const passport = require('../libs/passport');
const router = express.Router();
const {checkRole, checkAdmin, checkSameUser}=require('../middlewares/checkers.middleware');
const {getTags,addTags,detailTag,updateTagById, deleteTagById, uploadTagImage }=require('../controllers/tags.controller');
const { addAbortSignal } = require('stream');
const { multerTagsPhotos } = require('../middlewares/multer.middleware');

router.get('/',
  
  getTags
);

router.post('/',
  passport.authenticate('jwt',{session:false}),
  checkRole,
  checkAdmin,
  addTags
);

router.get('/:id',
  passport.authenticate('jwt',{session:false}),
  detailTag
);

router.put('/:id',
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