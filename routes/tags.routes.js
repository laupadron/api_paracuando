const express =require('express');
const passport = require('../libs/passport');
const router = express.Router();
const {checkRole, checkAdmin}=require('../middlewares/checkers.middleware');
const {getTags,addTags,detailTag,updateTagById, deleteTagById }=require('../controllers/tags.controller');
const { addAbortSignal } = require('stream');

router.get('/',
  passport.authenticate('jwt',{session:false}),
  getTags
);

router.post('/',
  passport.authenticate('jwt',{session:false}),
  checkRole,
  checkAdmin,
  addTags
);

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