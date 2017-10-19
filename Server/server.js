const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/Todo');
var {users} = require('./models/users');
var app =express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
 var demo = new todo({
   text : req.body.text,
   completed:req.body.complete,
   completedAt:req.body.completedAt
 });

 demo.save().then((doc)=>{
   console.log('Todo saved succeessfully',doc);
   res.send(doc);
 },(e)=>{
   console.log('Unable to save Todo ' + e);
   res.status(400).send(e);
 })
});

app.get('/todos',(req,res)=>{
  todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    console.log('Unable to send todo',e);
  })
})
app.listen(3000,()=>{
  console.log('Listening to port 3000');
})
