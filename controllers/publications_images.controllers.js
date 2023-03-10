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
  const isSameUser = request.isSameUser;

  const role = request.userRole;

  try {
    if (isSameUser || role === 2) {

      if (files.length) {
        let imagesKeys = []
        await imagesPublicationsService.publicationExistAndQuantity(idPublication,imagesKeys)
        console.log(idPublication)

        await Promise.all(files.map(async (file) => {

          const idImage = uuid.v4()
          const fileResize = await sharp(file.path)
            .resize({ height: 1920, width: 1080, fit: 'contain' })
            .toBuffer()
          let fileKey = `${idImage}`
          await uploadFile(fileResize, fileKey, file.mimetype)

          let newImagePublication = await imagesPublicationsService.createImage(idPublication,fileKey)

          imagesKeys.push(newImagePublication.image_url)
        }))
        await Promise.all(files.map(async (file) => {
          await unlinkFile(file.path)
        }))
        return response
          .status(200)
          .json({ results: { message: 'success upload', images: imagesKeys } });
      } else {
        throw new CustomError('Images were not received', 404, 'Not Found')
      }
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
  const isSameUser = request.isSameUser;
  const order = request.params.order
  const role = request.userRole;
  const idPublication = request.params.id;

  try {

    if (isSameUser || role === 2) {

      let imagePublication = await imagesPublicationsService.getImageOr404(idPublication, order)
      console.log(imagePublication)
      await deleteFile(imagePublication.image_url)

      await imagesPublicationsService.removeImage(idPublication, order)
      return response.status(200).json({ message: 'Image Removed' })
    }
  } catch (error) {
    next(error)
  }
}


const changeImageOrder = async (req, res, next) => {
  const isSameUser = req.isSameUser;
  const role = req.userRole;
  const idPublication = req.params.id
  console.log(idPublication)
  const { actual_order, next_order } = req.body;



  try {
    if (isSameUser || role === 2) {
      let changeOrder = await imagesPublicationsService.changeOrderImage({ actual_order, next_order }, idPublication)
      return res.status(200).json({ message: 'Order Change' })
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