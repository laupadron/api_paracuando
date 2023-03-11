const PublicationsService = require('../services/publications.service');
const uuid = require('uuid')
const { getPagination, CustomError } = require('../utils/helpers');


const publicationsService = new PublicationsService


const getPublications = async (req, res, next) => {
  const query = req.query
  const { publicationsPerPage, currentPage } = { publicationsPerPage: 10, currentPage: 1 };
  const { limit, offset } = getPagination(currentPage, publicationsPerPage);
  query.limit = limit
  query.offset = offset

  try {
    const publications = await publicationsService.findAndCount(query)
    res.json(publications);

  } catch (error) {
    next(error)
  }
}

const createPublication = async (req, res, next) => {
  const data = req.body

  try {
    if (!data.title) throw new CustomError('Not found title', 400, 'Required parameter');
    if (!data.cities_id) throw new CustomError('Not found city id', 400, 'Required parameter');
    if (!data.publications_types_id) throw new CustomError('Not found publication type id', 400, 'Required parameter');
    if (data.tags <= 0 || !data.tags) throw new CustomError('Not found tags id', 400, 'Required parameter');
    
    const publication = await publicationsService.createPublication({...data, id: uuid.v4(), user_id: req.user.id})
    
    if (!publication) throw new CustomError('Not publication created', 400, 'Contact admin');

    res.status(201).json({message: 'Publication created'})
  } catch (error) {
    next(error);
  }

}

const getPublicationById = async (req, res, next) => {
  const publicationId = req.params.id
  try {
    const publication = await publicationsService.findById(publicationId)
    res.json(publication);
  } catch (error) {
    next(error)
  }
}

const deletePublication = async (req, res, next) => {
  const isSameUser = req.isSameUser;
  const role = req.userRole;
  const id = req.params.id;

  try {
    if (isSameUser || role === 2) {
      await publicationsService.delete(id)
      res.json({ message: 'Publication removed' });
    } else {
      throw new CustomError('Not authorized user', 403, 'Forbbiden');
    }
  } catch (error) {
    next(error);
  }
};

const addVote = async (req, res, next) => {
  const isSameUser = req.isSameUser;
  const publicationId = req.params.id;
  const userId = req.user.id

  try {
    if (!isSameUser) {
      await publicationsService.addAndDelete(publicationId, userId);
      res.json({ message: 'Add-delete Vote' });
    } else {
      throw new CustomError('Not authorized user', 403, 'Forbbiden');
    }
  } catch (error) {
    next(error);
  }
}




module.exports = {
  deletePublication,
  addVote,
  getPublications,
  createPublication,
  getPublicationById,
  
}