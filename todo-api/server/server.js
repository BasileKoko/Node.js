var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose') // => local import diff from library import
// var mongoose = require('./db/mongoose').mongoose
// we are requiring the specific mongoose from the file ./db/mongoose
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.listen(3000, function(){
  console.log('listening on port 3000');
});

app.use(bodyParser.json());

app.post('/todos', function(req, res){
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then(function(doc){
    res.send(doc);
  }, function(e){
    res.status(400).send(e);
  });

  app.get('/todos', function(req, res){
    Todo.find().then(function(todos){
      res.send(todos)
    }, function(err){
     res.status(400).send(err);
   });
 });

});

app.get('/todos/:id', function(req, res){
  var id = req.params.id
  if(!ObjectID.isValid(id)) {
    return res.status(404).send("Invalid ID");
  };

  Todo.findById(id).then(function(todos){
    if(todos) {
      return res.send(todos);
    }
      res.status(404).send("No todo found");
   });
});

app.delete('/todos/:id', function(req, res){
  var id = req.params.id

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID')
  };

  Todo.findOneAndRemove({_id: id}).then(function(todo){
    if(!todo) {
    return res.status(404).send('No todo found to delete');
    }
      res.status(200).send('todo deleted successfuly')
  });
 });

app.put('/todos/:id', function(req, res){
  var id = req.params.id

  if (!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID')
  }

  Todo.findByIdAndUpdate(id, {$set: {text: req.body.text}}).then(function(todo){
    if(!todo) {
      return res.status(404).send('No todofound to update')
    }
      res.status(200).send('todo successfuly updated!')
  })


});
module.exports = {app};
