const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('./../server.js');
const {todo} = require('./../models/Todo');

const todos = [{
  _id:new ObjectID(),
  text:'first text'
},
{_id:new ObjectID(),
  text:'second text'}]

beforeEach((done)=>{
  todo.remove({}).then(()=>{
    todo.insertMany(todos).then(()=>done())
  });
})

describe('POST/todos',()=>{


  it('should create a new todo',(done)=>{
      var text ='This is todo text'
    request(app).
    post('/todos').
    send({text}).
    expect(200).
    expect((res)=>{
      expect(res.body.text).toBe(text)
    }).end((err,res)=>{
      if(err){
        return done(err);
      }
      todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text);
        done();
      }).catch(e=>done(e))
    })

  })
  it('should not create a todo when bad request is passed',(done)=>{
    request(app).
    post('/todo').
    send({}).
    expect(404).
    end((err,res)=>{
      if(err){
        return done(err);
      }

      todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    })


  })

})

describe('GET/Todos',()=>{

  it('should get all the todos',(done)=>{
    request(app).
    get('/todos').
    expect(200).
    expect((res)=>{
      expect(res.body.todos.length).toBe(2)
    }).end(done());
  })
})

describe('GET /todos/:id',()=>{
  it('should get using the id',(done)=>{
    request(app).
    get(`todos/${todos[0]._id.toHexString()}`).
    expect(200).
    expect((res)=>{
      expect(res.body.todos[0].text).toBe(todos[0].text);
    }).end(done())
  })

  it('should return 404 if todo not found',(done)=>{
    request(app).
    get(`todos/${new ObjectID().toHexString()}`).
    expect(404).
    end(done())
  })
  it('should return 404 for non-object id',(done)=>{
    request(app).
    get('/todos/123').
    expect(404).
    end(done());
  })
})
