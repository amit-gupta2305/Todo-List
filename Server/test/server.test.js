const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {todo} = require('./../models/Todo');

beforeEach((done)=>{
  todo.remove({}).then(()=> done());
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
