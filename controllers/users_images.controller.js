const ImagesUsersService = require('../services/images_users.service')
const UsersService = require('../services/users.service')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid')
const { uploadFile, getObjectSignedUrl, deleteFile, getFileStream } = require('../libs/s3')
const sharp = require('sharp')
const CustomError = require('../utils/helpers')
const unlinkFile = util.promisify(fs.unlink)

const imagesUsersService = new ImagesUsersService();
const userService = new UsersService();


const uploadImageUsers = async (request, response, next) => {
  const userId = request.params.id
  const file = request.file
  console.log(file);

  try {
    if (file) {
      await userService.getUser(userId)
      const idImage = uuid.v4()
      const fileResize = await sharp(file.path)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer()
      let fileKey = `user-image-${userId}-${idImage}`
      await uploadFile(fileResize, fileKey, file.mimetype)
      let result = await userService.updateUser(userId, {image_url: fileKey})
      await unlinkFile(file.path)
      return response.status(200).json({ results: { message: 'success upload', image:  result.image_url} });
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


module.exports = {
  uploadImageUsers
}