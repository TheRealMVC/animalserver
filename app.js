var express = require('express');
var app = express();
var sequelize = require('./db');
var bodyParser = require('body-parser');
var animal  = require('./controllers/animal-controller');
var person = require('./controllers/person-controller');

sequelize.sync();

app.use(bodyParser.json());

app.listen(3000, function(){
  console.log('App is listening on Port 3000');
})
app.use(require('./middleware/headers'));
app.use('/person', person);

app.use('/animal', animal);