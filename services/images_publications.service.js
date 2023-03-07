const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const sharp = require('sharp')
const { uploadFile } = require('../libs/s3') // Importamos la función para subir archivos a AWS S3
const { unlink } = require('fs/promises')

class ImagesPublicationsService {

	async publicationImagesExist(idPublication){
		const transaction = await models.sequelize.transaction()
		try {
			const publicationImages = await models.Publications.findByPk(idPublication);
			console.log(publicationImages)
      if (publicationImages) throw new CustomError('Not found publication', 404, 'Not Found');
		} catch (error) {
			await transaction.rollback();
      throw error;
		}
	}
	
	async createImage(idImage, fileKey, idPublication){
		const transaction = await models.sequelize.transaction()
		try {
			
			let addImage= await models.Publications_images.create({id:1,publication_id:idPublication,image_url:fileKey,order:1}, { transaction })
			await transaction.commit();
			return addImage	
		} catch (error) {
			await transaction.rollback();
      throw error;
		}
		
	}
}

module.exports = ImagesPublicationsService