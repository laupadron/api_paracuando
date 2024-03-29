const express = require('express');
const passport = require('../libs/passport');
const router = express.Router()
const { checkRole, checkAdmin } = require('../middlewares/checkers.middleware');
const { getPublicationTypeById, updatePublicationTypeById, getFilteredPublicationType } = require('../controllers/publicationsTypes.controller')

router.get('/',
  getFilteredPublicationType
);

router.get('/:id',
  
  getPublicationTypeById
)

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  checkAdmin,
  updatePublicationTypeById
)



module.exports = router