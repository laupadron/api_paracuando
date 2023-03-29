const { v4: uuid4 } = require('uuid');
const models = require('../database/models')
const { CustomError } = require('../utils/helpers');
const { hashPassword } = require('../libs/bcrypt');
const { uploadFile } = require('../libs/s3') 
const { unlink } = require('fs/promises')

class ImagesPublicationsService {
constructor () {}

  async getAvailableImageOrders(publication_id) {
    
    let availableValues = [1,2,3]
    
    let images = await models.Publications_images.findAll({
      attributes: {exclude:['created_at','updated_at']},
      where: {publication_id}, 
      raw: true
    })

    if (!images) return availableValues
    if (images.length == 0) return availableValues
    if (images.length >= availableValues.length) throw new CustomError('Not available spots for images for this publication. First, remove a image',409, 'No Spots Available')

    
    let existedOrders = images.map( (image) =>  image['order'])
    
    let availableSpots = availableValues.filter(spot => !existedOrders.includes(spot))
    
    return availableSpots
  }

  async createImage(publication_id,bucketURL,order) {
    
    const transaction = await models.sequelize.transaction()
    
    try {  
      let newImage = await models.Publications_images.create({ publication_id, image_url:bucketURL, order }, { transaction })
      await transaction.commit();
      return newImage
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  }
  async getImageOr404(publication_id, order) {
    const publicationImage = await models.Publications_images.findOne({ where: { publication_id, order: parseInt(order) }});
    if (!publicationImage) throw new CustomError('Not Found Publication Image with this order', 404, 'Not Found');
    return publicationImage

  }

  async removeImage(publication_id, order) {
    const transaction = await models.sequelize.transaction()
    try {

      let publication = await models.Publications_images.findOne({
        where: { publication_id, order: parseInt(order) },
      }, { transaction });

      await publication.destroy({transaction})
      await transaction.commit();

      return publication
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