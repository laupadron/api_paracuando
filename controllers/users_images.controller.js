const UsersService = require('../services/users.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')
const sharp = require('sharp')
const { CustomError } = require('../utils/helpers')
const unlinkFile = util.promisify(fs.unlink)

const userService = new UsersService();

const uploadImageUsers = async (request, response, next) => {
  const userId = request.params.id
  const file = request.file
  console.log(file);
  try {
    if (!request.isSameUser) throw new CustomError('User not authorized', 401, 'Unauthorized')
    if (file) {
      await userService.getUser(userId)
      const idImage = uuid.v4()
      const fileResize = await sharp(file.path)
        .resize({ height: 1080, width: 1440, fit: 'contain' })
        .toBuffer()
      let fileKey = `user-image-${userId}-${idImage}`
      await uploadFile(fileResize, fileKey, file.mimetype)
      const imageURL = await getObjectSignedUrl(fileKey)
      let result = await userService.updateUser(userId, { image_url: imageURL })
      await unlinkFile(file.path)
      return response.status(200).json({ results: { message: 'success upload', image: result.image_url } });
    } else {
      throw new CustomError('Image were not received', 400, 'Bad request')
    }
  } catch (error) {
    if (file) {
      await unlinkFile(file.path)
    }
    next(error)
  }
}

const destroyUserImage = async (request, response, next) => {
  const userId = request.params.id

  try {
    if (!request.isSameUser){
      if (request.role !== 2) throw new CustomError('Not authorized User', 401, 'Unauthorized')
    } 
    const { image_url } = await userService.getUser(userId)
    const imageKey = image_url.split('/').pop().split('?')[0]
    await deleteFile(imageKey)
    await userService.updateUser(userId, { image_url: null })
    response.status(200).json({message: 'Image Removed'})
  } catch (error) {
    next(error)
  }
}


module.exports = {
  uploadImageUsers,
  destroyUserImage
}