const express = require('express');
const passport = require('../libs/passport');
const router = express.Router()
const {checkRole, checkAdmin} = require('../middlewares/checkers.middleware');
const { getPublicationTypeById,updatePublicationTypeById } = require('../controllers/publicationsTypes.controller')

router.get('/',
  passport.authenticate('jwt', { session: false }), 
  // no entiendo para que es esta ruta en realidad, debo de filtrar pero por que filtro? 
  //una palabra o que?, devuelve vista paginada de que? los pub types o las publicaciones?
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  getPublicationTypeById 
)

router.post('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRole,
  checkAdmin,
  updatePublicationTypeById
)



module.exports = router