var express = require('express');
var todoController = require('./controllers/todoController')


var bodyParser = require('body-parser');


var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));



todoController(app);

app.listen(3000);
