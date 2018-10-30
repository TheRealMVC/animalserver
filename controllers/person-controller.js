var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/person');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/signup', function(req, res){
    console.log('we did it')
  let email = req.body.email;
  let password = bcrypt.hashSync(req.body.password,10);


  User.create({
    email: email,
    password: password
  })
    .then(
      function(person){
        let token = jwt.sign({id: person.id}, 'i_am_secret', {expiresIn: 60*60*24});

        res.json({
          person: person,
          message: 'person created',
          sessionToken: token
        })
      },
      function(err){
        console.log(500, err)
      }
    )
})

module.exports = router;