const models = require('../database/models');
const {v4: uuid4} = require('uuid');
const  {CustomError}  = require('../utils/helpers');

const { Op } = require('sequelize')


class PublicationsService{
	constructor() {
	}
	async getPublications(query) {
		const options = {
		  where: {},
		}
const { id } = query
    if (id) {
      options.where.id = id
    }
	 const { title } = query
    if (title) {
      options.where.name = { [Op.iLike]: `%${title}%` }
    }
	 options.distinct = true

const publications = await models.Publications.scope('auth_flow').findAndCountAll(options)
return publications
}


	async delete (id){
		const transaction = await models.sequelize.transaction();
		try {
			const publication = await models.Publications.findByPk(id);
			
			if (!publication) throw new CustomError('Not found publication', 404, 'Not Found');
			const deletePublication=await publication.destroy({transaction});
			await transaction.commit();
			 
			return deletePublication;
			
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	};

	async addAndDelete (publicationId,userId){
		const transaction = await models.sequelize.transaction();
		try {
			// const publication = await models.Publications.findByPk(publicationId);
			const vote =await models.Votes.findOne({where: {user_id: userId, publications_id: publicationId}});
			if(vote){
				const deleteVote = await models.Votes.destroy({where: { user_id: userId, publications_id: publicationId}}, {transaction});
				await transaction.commit();
				
				return deleteVote;
			
			}else{
					const newVote = await models.Votes.create({ user_id: userId, publications_id: publicationId}, {transaction});
					await transaction.commit();
					
					return newVote;
			}
		} catch (error) {
			await transaction.rollback();
			throw error;
		}
	}
};

module.exports = PublicationsService;