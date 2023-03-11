const ImagesPublicationsService = require('../services/images_publications.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')
const sharp = require('sharp')
const CustomError = require('../utils/helpers')
const { UUIDV4 } = require('sequelize')


const unlinkFile = util.promisify(fs.unlink)

const imagesPublicationsService = new ImagesPublicationsService();


const uploadImagePublication = async (request, response, next) => {
  const idPublication = request.params.id
  const files = request.files
  const publicationOwner = request.publicationOwner;
  const role = request.userRole;

  try {
    if (publicationOwner || role === 2) {
      if (files.length) {
        let imagesKeys = []
        await imagesPublicationsService.publicationExistAndQuantity(idPublication, files.length)

        await Promise.all(files.map(async (file) => {
          const idImage = uuid.v4()
          const fileResize = await sharp(file.path)
            .resize({ height: 1080, width: 1440, fit: 'contain' })
            .toBuffer()
          let fileKey = `${idImage}`
          await uploadFile(fileResize, fileKey, file.mimetype)
          const imageURL = await getObjectSignedUrl(fileKey)
          let newImagePublication = await imagesPublicationsService.createImage(idPublication, fileKey)
          imagesKeys.push(imageURL)
        }))

        await Promise.all(files.map(async (file) => {
          await unlinkFile(file.path)
        }))

        return response
          .status(200)
          .json({ results: { message: 'Success Upload', images: imagesKeys } });
      } else {
        throw new CustomError('No images received', 400, 'Bad Request')
      }
    } else {
      throw new CustomError('Not authorized user', 403, 'Forbbiden')
    }

  } catch (error) {
    if (files) {
      await Promise.all(files.map(async (file) => {
        await unlinkFile(file.path)
      }))
    }
    next(error)
  }
}


const destroyImageByPublication = async (request, response, next) => {
  const publicationOwner = request.publicationOwner;
  const order = request.params.order
  const role = request.userRole;
  const idPublication = request.params.id;

  try {
    if (publicationOwner || role === 2) {
      let {image_url} = await imagesPublicationsService.getImageOr404(idPublication, order)
      const imageKey = image_url.split('/').pop().split('?')[0]
      await deleteFile(imageKey)
      await imagesPublicationsService.removeImage(idPublication, order)
      return response.status(200).json({ message: 'Image Removed' })
    }
  } catch (error) {
    next(error)
  }
}

const changeImageOrder = async (req, res, next) => {
  const publicationOwner = req.publicationOwner;
  const role = req.userRole;
  const idPublication = req.params.id
  const { actual_order, next_order } = req.body;

  try {
    if (publicationOwner || role === 2) {
      let changeOrder = await imagesPublicationsService.changeOrderImage({ actual_order, next_order }, idPublication)
      return res.status(200).json({ message: 'Order Change' })
    } else {
      throw new CustomError('Not authorized user', 403, 'Forbbiden')
    }
  } catch (error) {
    next(error)
  }
}


module.exports = {
  uploadImagePublication,
  destroyImageByPublication,
  changeImageOrder
}