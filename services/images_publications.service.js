const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const sharp = require('sharp')
const { uploadFile } = require('../libs/s3') // Importamos la función para subir archivos a AWS S3
const { unlink } = require('fs/promises')

class ImagesPublicationsService {

  async publicationExistAndQuantity(idPublication, imagesKeys) {
    const transaction = await models.sequelize.transaction()
    try {
      const publicationImages = await models.Publications.findByPk(idPublication);

      if (!publicationImages) {
        throw new CustomError('Not found publication', 404, 'Not Found');
      }
      if (imagesKeys.length > 3) {
        throw new CustomError('Too many files', 400, 'Bad Request');
      }

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }


  async createImage(idPublication, fileKey) {
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
  async getImageOr404(idPublication, order) {
    const transaction = await models.sequelize.transaction()
    try {
      const publicationImages = await models.Publications_images.findByPk(idPublication, {
        where: { order: order },
        transaction,
      });
      console.log(publicationImages)

      if (!publicationImages) throw new CustomError('Not found publication', 404, 'Not Found');
      else return publicationImages

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async removeImage(idPublication, order) {
    const transaction = await models.sequelize.transaction()
    try {

      const deleteImages = await models.Publications_images.destroy({
        where: { publication_id: idPublication, order: order },
        transaction,
      });
      await transaction.commit();

      return deleteImages;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }



  async changeOrderImage({ actual_order, next_order }, idPublication) {

    const transaction = await models.sequelize.transaction();
    try {
      const image = await models.Publications_images.findOne({ where: { publication_id: idPublication, order: actual_order } }, { transaction });

      const nextImage = await models.Publications_images.findOne({ where: { publication_id: idPublication, order: next_order } }, { transaction });

      await image.update({ order: next_order }, { transaction });
      await nextImage.update({ order: actual_order }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = ImagesPublicationsService