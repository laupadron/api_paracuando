
const checkSameUser = async (req, res, next) => {
  const idFromParams = req.params.id
  const idFromToken = req.user.id
  if (idFromParams === idFromToken) {
    req.isSameUser = true
    console.log(req.isSameUser);
    next();
  }else{
    req.isSameUser = false
    console.log(req.isSameUser);
    next();
  }
}

module.exports = {
  checkSameUser
}