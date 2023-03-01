const TagsService = require('../services/tags.service');


const { getPagination, CustomError } = require('../utils/helpers');
const tagsService = new TagsService

const getTags = async (req, res, next) => {
  const tagsPerPage = 10;
  const page = 1;
  const { limit, offset } = getPagination(page, tagsPerPage);
  const query = req.query;
  try {
    const tags = await tagsService.getFilteredTags({ ...query, limit, offset })
    return res.status(200).json(tags)
  }
  catch (error) {
    next(error)
  }
};

const addTags = async (req, res, next) => {
  try {
    const tag = req.body
    const addTag = await tagsService.createdTag(tag)
    return res.status(201).json(addTag)
  } catch (error) {
    next(error)
  }
};

const detailTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await tagsService.getDetailTag(id)
    return res.status(200).json(tag)
  } catch (error) {
    next(error)
  }
}

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
  getTags,
  addTags,
  detailTag,
  updateTagById,
  deleteTagById
}