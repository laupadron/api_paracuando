const ImagesPublicationsService = require('../services/images_publications.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, deleteFile } = require('../libs/s3')
const CustomError = require('../utils/helpers')
const { UUIDV4 } = require('sequelize')
const unlinkFile = util.promisify(fs.unlink)
const imagesPublicationsService = new ImagesPublicationsService();



const uploadImagePublication = async (request, response, next) => {

  const publicationID = request.params.id;
  const files = request.files;
  const publicationOwner = request.publicationOwner;
  const role = request.userRole;
  try {
    if (publicationOwner || role === 2) {

      if (files.length < 1) throw new CustomError('No images received', 400, 'Bad Request');

      let imagesKeys = [];
      let imagesErrors = [];

      let openSpots = await imagesPublicationsService.getAvailableImageOrders(publicationID)

      await Promise.all(

        openSpots.map(async (spot, index) => {
          try {

            if (!files[index]) return

            let fileKey = `publication-image-${publicationID}-${spot}`;

            if (files[index].mimetype == 'image/png') {
              fileKey = `publication-image-${publicationID}-${spot}.png`;
            }

            if (files[index].mimetype == 'image/jpg') {
              fileKey = `publication-image-${publicationID}-${spot}.jpg`;
            }

            if (files[index].mimetype == 'image/jpeg') {
              fileKey = `publication-image-${publicationID}-${spot}.jpeg`;
            }

            await uploadFile(files[index], fileKey);

            let bucketURL = fileKey;

            let newImagePublication = await imagesPublicationsService.createImage(
              publicationID,
              bucketURL,
              spot
            );

            imagesKeys.push(bucketURL)

          } catch (error) {
            imagesErrors.push(error.message)
          }
        })
      );


      await Promise.all(
        files.map(async (file) => {
          try {
            await unlinkFile(file.path);
          } catch (error) {

          }
        })
      );

      return response
        .status(200)
        .json({ results: { message: `Count of uploaded images: ${imagesKeys.length}`, imagesUploaded: imagesKeys, imageErrors: imagesErrors } });
    }

  } catch (error) {
    if (files) {
      await Promise.all(
        files.map(async (file) => {
          try {
            await unlinkFile(file.path);
          } catch (error) {
            //
          }
        })
      );
    }
    return next(error);
  }
};


const removePublicationImage = async (request, response, next) => {
  const publicationOwner = request.publicationOwner;
  const role = request.userRole;
  const publicationID = request.params.id
  const order = request.params.order
  try {
    if (publicationOwner || role === 2) {
      let { image_url } = await imagesPublicationsService.getImageOr404(publicationID, order)
      let awsDomain = process.env.AWS_DOMAIN
      const imageKey = image_url.replace(awsDomain, '')
      await deleteFile(imageKey)
      let publicationImage = await imagesPublicationsService.removeImage(publicationID, order)

      return response.status(200).json({ message: 'Removed', image: publicationImage })
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
  removePublicationImage,
  changeImageOrder
}