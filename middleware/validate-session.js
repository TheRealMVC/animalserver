const jwt = require('jsonwebtoken');
const Person = require('../db').import('../models/person');

const validateSession = (req, res, next) => {
  console.log('we are in validate session');
  const token = req.headers.authorization;
  jwt.verify(token, 'i_am_secret', (err, decodedToken) => {
    if (!err && decodedToken){
      Person.findOne({where: {id: decodedToken.id}})
        .then(user => {
          if (!user) throw 'err'
          req.user = user;
          return next();
        })
        .catch(err => next(err))
    } else {
      req.errors = err;
      return next();
    }
  })
}

module.exports = validateSession;