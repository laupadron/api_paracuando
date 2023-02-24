const models = require('../database/models');
const {v4: uuid4} = require('uuid');
const  {CustomError}  = require('../utils/helpers');
// const { hashPassword } = require('../libs/bcrypt');
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
async getVotes(query) {
	const options = {
	  where: {},
	}
const { id } = query
 if (id) {
	options.where.id = id
 }
 const { tag_id } = query
 if (tag_id) {
	options.where.tag_id = { [Op.iLike]: `%${tag_id}%` }
 }
 const { publication_id } = query
 if (publication_id) {
	options.where.publication_id = { [Op.iLike]: `%${publication_id}%` }
 }
 options.distinct = true

const votes = await models.Votes.scope('auth_flow').findAndCountAll(options)
return votes
}

	async delete (id){
		const transaction = await models.sequelize.transaction();
		try {
			const publication = await models.Publications.findByPk(id)
			if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')
			const deletePublication=await publication.destroy({transaction})
			await transaction.commit()
			 return deletePublication
			
		} catch (error) {
			await transaction.rollback()
			throw error;
		}
	};

	async addAndDelete (idParams,{tag_id,publication_id}){
		const transaction = await models.sequelize.transaction();
		const idFromToken = req.user.id
		try {
			const publication = await models.Publications.findByPk(id)
			if(!publication) {
				const addVote = await models.Votes.create({id: uuid4(),tag_id:idFromToken,publication_id:idParams});
				
				return addVote
				
			}else{

			}
		} catch (error) {
			await transaction.rollback()
			throw error;
		}
	}
};

module.exports = PublicationsService;