const TagsService = require('../services/tags.service');

const tagsService = new TagsService

const updateTagById = async (req, res, next) => {
  const id = req.params.id
  const obj = req.body
  try {
    await tagsService.updateTagById(id, obj)
    res.json({message: 'Successfully updated'});
  } catch (error) {
    next(error)
  }
}

const deleteTagById = async (req, res, next) => {
  const id = req.params.id
  try {
    await tagsService.deleteTagById(id)
    res.json({message: 'Tag removed'});
  } catch (error) {
    next(error)
  }
}

module.exports = {
  updateTagById,
  deleteTagById
}
