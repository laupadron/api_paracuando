const express = require('express');
const passport = require('../libs/passport');
const router = express.Router();
const { checkRole, checkAdmin, checkSameUser } = require('../middlewares/checkers.middleware');
const { getPublications, getPublicationById,createPublication, deletePublication, addVote } = require('../controllers/publications.controller');

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
)

module.exports = router;