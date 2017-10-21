const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {todo} = require('./models/Todo');
var {users} = require('./models/users');
var app =express();

const port = process.env.PORT || 3000;
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
  });
})

app.get('/todos/:id',(req,res)=>{
  var id =req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send('ID not valid');
   }
    todo.findById(id).then((todos)=>{
      if(!todos){
        return res.status(404).send('Nothing found');
      }
        res.send(todos);

   }).catch((e)=>res.send(e))


  });
app.listen(port,()=>{
  console.log(`Listening to port ${port}');
});

module.exports = app;
