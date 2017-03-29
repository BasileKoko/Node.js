var mongoose = require('mongoose');
var bodyParser = require('body-parser');
 require('dotenv').config();
var url = process.env.MLAB_DB_URL;



var todoSchema = new mongoose.Schema({
  item: String

});

var Todo = mongoose.model('Todo', todoSchema);

mongoose.connect(url);


var urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports =  function(app) {
  app.get('/todo', function(req, res){
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
