const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const sharp = require('sharp')
const { uploadFile } = require('../libs/s3') // Importamos la función para subir archivos a AWS S3
const { unlink } = require('fs/promises')

class ImagesPublicationsService {

  async publicationExistAndQuantity(publication_id, imagesKeys) {
    const transaction = await models.sequelize.transaction()
    try {
      const publication = await models.Publications.findByPk(publication_id);
      if (!publication) {
        throw new CustomError('Not found publication', 404, 'Not Found');
      }
      if (imagesKeys.length > 3) {
        throw new CustomError('Too many files', 400, 'Bad Request');
      }

      const publicationImages = await models.Publications_images.findAll({where: {publication_id}});
      if (publicationImages.length >= 3) {
        throw new CustomError('Already 3 files in the publication', 400, 'Bad Request');
      }


    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }


  async createImage(idPublication,fileKey) {
    const transaction = await models.sequelize.transaction()
    try {
      let order;
      let existingImage;
      do {
        order = Math.floor(Math.random() * 3) + 1;
        existingImage = await models.Publications_images.findOne({
          where: {
            publication_id: idPublication,
            order: order
          }
        });
      } while (existingImage);
      let addImage = await models.Publications_images.create({ publication_id: idPublication, image_url: fileKey, order: order }, { transaction })
      await transaction.commit();
      return addImage
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }
  async getImageOr404(publication_id, order) {
    const transaction = await models.sequelize.transaction()
    try {
      const publicationImage = await models.Publications_images.findOne({ where: { publication_id, order }}, {transaction});
      if (!publicationImage) throw new CustomError('Not image founded', 404, 'Not Found');
      return publicationImage
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async removeImage(publication_id, order) {
    const transaction = await models.sequelize.transaction()
    try {
      await models.Publications_images.destroy({
        where: { publication_id, order },
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }



  async changeOrderImage({ actual_order, next_order }, idPublication) {

    const transaction = await models.sequelize.transaction();
    try {
      const currentImage = await models.Publications_images.findOne({ where: { 
        publication_id: idPublication, 
        order: actual_order 
      } }, { transaction });

      const nextImage = await models.Publications_images.findOne({ where: { 
        publication_id: idPublication, 
        order: next_order 
      } }, { transaction });

      if (currentImage && nextImage) {
        await currentImage.update({ order: next_order }, { transaction });
        await nextImage.update({ order: actual_order }, { transaction });        
      } else if (currentImage && !nextImage){
        await currentImage.update({ order: next_order }, { transaction });
      }else if (!currentImage){
        throw new CustomError('No current image found for this order/publication', 404, 'Not Found')
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ImagesPublicationsService