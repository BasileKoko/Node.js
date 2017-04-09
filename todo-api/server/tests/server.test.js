const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{_id: "58e3b4f8b289b3166ccbc880", text: "First text"}, {_id: "58e3b4f8b289b3166ccbc881", text: "Second text"}]

beforeEach(function(done){
  Todo.remove({}).then(function(){
    return Todo.insertMany(todos);
    }).then(function(){
      done();
    });
});

describe('POST /todos', function(){
  it('should create a new todo', function(done){
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect(function(res){
      expect(res.body.text).toBe(text);
    })
    .end(function(err, res){
      if (err) {
        return done(err);
      }

      Todo.find().then(function(todos){
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      }).catch(function(err){
        done(err);
      });
    });
  });

  it('should not create a todo with invalid data', function(done){
    request(app)
    .post('/todos')
    .send("")
    .expect(400)
    .end(function(err, res){
      if (err){
        return done(err);
      }
      Todo.find().then(function(todos){
        expect(todos.length).toBe(2);
        done();
      });
    });
  });
});

describe('GET todos', function(){
  it('should retrieve all todos', function(done){
    request(app)
    .get('/todos')
    .expect(200)
    .expect(function(res){
      expect(res.body.length).toBe(2);
    }).end(done);
  });
});

describe('GET todos/:id', function(){
  it('should not retrieve todos with invalid id', function(done){
    request(app)
    .get('/todos/1234')
    .expect(404)
    .expect(function(res){
      expect(res.body).toEqual({})
    }).end(done);
  })

  it('should return empty todos with id not in db', function(done){
    request(app)
    .get('/todos/58e239e1a8c8dc0c790fdb57')
    .expect(404)
    .expect(function(res){
      expect(res.body).toEqual({})
    }).end(done);
  });

  it('should return the correct todo', function(done){
    request(app)
    .get('/todos/58e3b4f8b289b3166ccbc881')
    .expect(200)
    .expect(function(res){
      expect(res.body.text).toEqual('Second text')
    }).end(done);
  });
});

describe('DELETE /todos/:id', function(){

  it('should delete todo', function(done){
    request(app)
    .delete('/todos/58e3b4f8b289b3166ccbc881')
    .expect(200)
    .expect(function(res){
      expect(res.text).toBe("todo deleted successfuly")
    }).end(done);
  });
});

describe('PUT /todos/:id', function(){
  it('should update todo', function(done){
    request(app)
    .put('/todos/58e3b4f8b289b3166ccbc881')
    .expect(200)
    .expect(function(res){
      expect(res.text).toBe('todo successfuly updated!')
    }).end(done);
  });

  it('should not update missing todo', function(){
    request(app)
    .put('/todos/58e3b4f8b289b3166ccbc880')
    .expect(404)
    .expect(function(res){
      expect(res.text).toBe('No todo found to update')
    })
  })
});
