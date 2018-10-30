var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Animal = sequelize.import('../models/animal');
var validateSession = require('../middleware/validate-session');

router.post('/create', validateSession, function(req, res){
  if (!req.errors){
  let name = req.body.name;
  let legs = req.body.legnumber;
  let predator = req.body.predator;

  Animal.create({
    name: name,
    legNumber: legs,
    predator: predator
  })
    .then(
      function (){
        res.send('New animal added!');
      },
      function (err){
        console.log(err);
      }
    )
  } else {
    res.status(500).json(req.errors);
  }
})

router.delete('/delete/:id', validateSession, function(req, res){
  let id = req.params.id;

  Animal.destroy({
    where: {id: id}
  })
    .then(
      function(){
        res.send('new animal deleted');
      },
      function(err){
        console.log(err)
      }
    )
})

module.exports = router;