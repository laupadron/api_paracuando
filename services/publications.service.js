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
// async getVotes(query) {
// 	const options = {
// 	  where: {},
// 	}

//  const { user_id } = query
//  if (user_id) {
// 	options.where.user_id = { [Op.iLike]: `%${user_id}%` }
//  }
//  const { publications_id } = query
//  if (publications_id) {
// 	options.where.publications_id = { [Op.iLike]: `%${publications_id}%` }
//  }
//  options.distinct = true

// const votes = await models.Votes.scope('auth_flow').findAndCountAll(options)
// return votes
// }

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

	async addAndDelete (publicationId,userId,publications_id){
		const transaction = await models.sequelize.transaction();
		try {
			const publication = await models.Publications.findByPk(publicationId)
			
			if(publication) {
				const votes = await models.Votes.findByPk(publications_id)
				console.log(votes)
				if(publications_id === publicationId){
					const deleteVote = await votes.delete()
					await transaction.commit()
					return deleteVote
					
				}
				
				
		
				//hacer otro if para que si encuentra la public en votes la borre o la agregue
				// const addVote = await models.Votes.create({id: uuid4(),tag_id:idFromToken,publication_id:idParams});
				
				// return addVote
				
			}else{
			 const newVote = await models.Votes.create({ user_id: userId, publications_id: publicationId}, {transaction})
					console.log(newVote)
					await transaction.commit()
				
			}
		} catch (error) {
			await transaction.rollback()
			throw error;
		}
	}
};

module.exports = PublicationsService;