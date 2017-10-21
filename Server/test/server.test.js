const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {todo} = require('./../models/Todo');
const todos = [{
  _id:new ObjectID(),
  text:'First todo'
},{
  _id:new ObjectID(),
  text:'Second todo'
}]

beforeEach((done)=>{
  todo.remove({}).then(()=>{
    return todo.insertMany(todos);
  }).then(()=>done());
});

describe('Todo/Post',()=>{
  it('it should create a new todo',(done)=>{
     var text ='this is text';
    request(app).
    post('/todos').
    send({text}).
    expect(200).
    expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      todo.find().then((todos)=>{
        expect(todos.length).toBe(1).
        expect(todos[0].text).toBe(text);
      }).catch((e)=>done(e));
    } )
  })

});

it('it should not create a new todo',(done)=>{

  request(app).
  post('/todos').
  send({}).
  expect(400)
  .end((err,res)=>{
    if(err){
      return done(err);
    }
    todo.find().then((todos)=>{
      expect(todos.length).toBe(0)
    }).catch((e)=>done(e));
  } )
})

describe('GET/todos',()=>{
  it('Should get all the todos',(done)=>{
    request(app).
    get('/todos').
    expect(200).
    end((err,res)=>{
      if(err){
        return done(err);
      }
      expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      }).catch((e)=>done(e));

    });
  })

});

describe('GET/todos:id',()=>{
  it('should create a new todo',(done)=>{
    request(app).
    get(`/todos/${todos[0]._id.toHexString()}`).
    expect(200).
    expect((res)=>{
      expect(res.body.todos.text).toBe(todos[0].text);
    }).end(done);
    })

    it('should return 404 if todo not found',(done)=>{
      var hexId= new ObjectID().toHexString();
      request(app).
      get(`/todos/{hexId}`).
      expect(404).
      end(done);

    })

    it('should return 404 for on-object ids',(done)=>{
      request(app).
      get(`/todos/123`).
      expect(404).
      end(done);
    })
  })
