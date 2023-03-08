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
  const  idPublication = request.params.id
  
  const files = request.files
  const isSameUser = request.isSameUser;

  const role = request.userRole;
  
  try {
    if (isSameUser || role === 2) {
      
    if (files.length) {
      let imagesKeys = []
      await imagesPublicationsService.publicationExistAndQuantity(idPublication,files)
      

      await Promise.all(files.map(async (file) => {
        if (file.size > 524288) {
          throw new CustomError(`File is too large. Maximum file size is 0.5 MB.`, 400, 'Bad Request');
        }
        const idImage = uuid.v4()
        
        const fileResize = await sharp(file.path)
          .resize({ height: 1920, width: 1080, fit: 'contain' })
          .toBuffer()
        let fileKey = `${idImage}`
        await uploadFile(fileResize, fileKey, file.mimetype)

        
        let newImagePublication = await imagesPublicationsService.createImage( idPublication,fileKey)

        imagesKeys.push(newImagePublication.image_url)
        console.log(imagesKeys)
      }))
      await Promise.all(files.map(async (file) => {
        await unlinkFile(file.path)
      }))
      return response
        .status(200)
        .json({ results: { message: 'Image Added', images: imagesKeys } });
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
  const  idPublication = request.params.id;
  
  try {
    
    if (isSameUser || role === 2) {
      
    let imagePublication = await imagesPublicationsService.getImageOr404(idPublication,order)
    console.log(imagePublication)
    // await deleteFile(imagePublication.key_s3) POR QUE NO BORRA EN AWS??
   
    await imagesPublicationsService.removeImage(idPublication,order)
    return response.status(200).json({ message: 'Image Removed' })
    }
  } catch (error) {
    next(error)
  }
}

  const changeImageOrder = async (req,res,next)=> {
    const isSameUser = req.isSameUser;
    const role = req.userRole;
    const  idPublication = req.params.id;
    const {actual_order,next_order} = req.body;
    console.log(actual_order)
    

    try {
      if (isSameUser || role === 2) {
        let changeOrder = await imagesPublicationsService.changeOrderImage(actual_order,next_order)
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