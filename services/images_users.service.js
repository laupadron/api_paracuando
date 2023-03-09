const models = require('../database/models')
const { CustomError } = require('../utils/helpers');

class ImagesUsersService {

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
}

module.exports = ImagesUsersService