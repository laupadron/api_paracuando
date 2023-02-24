const AuthService = require('../services/auth.service');
const PublicationsService = require('../services/publications.service')
const { CustomError } = require('../utils/helpers');


const publicationsService = new PublicationsService()
const authService = new AuthService()

const deletePublication = async (req,res,next) =>{
	
	const isSameUser = req.isSameUser;
	console.log(isSameUser)
	const role = req.userRole;
	console.log(role)
	const  id  = req.params.id;
	
	try {
		
		if (isSameUser   || role === 2){
		await publicationsService.delete(id)
		res.json({message: 'Publication removed'});
		}else{
			throw new CustomError('Not authorized user', 401, 'Unauthorized');
		}
	} catch (error) {
		next(error);
	}
};

const addVote = async (req,res,next) =>{
	const isSameUser = req.isSameUser;
	const  publicationId  = req.params.id;
	
	const userId = req.user.id
	
	try {
		if(!isSameUser){
			await publicationsService.addAndDelete(publicationId,userId);
			res.json({message: 'Add-delete Vote'});
	} else {
		throw new CustomError('Not authorized user', 401, 'Unauthorized');
		}
	} catch (error) {
		next(error);
	}
}



module.exports = {
	deletePublication,
	addVote
}