const {ObjectID} = require('mongodb');
const {mongoose} = require('./../Server/db/mongoose');
const {todo} =require('./../Server/models/Todo');
const {users}=require('./../Server/models/users');

var id='59e5d3109c904a0b44875c3e';

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// todo.find({_id:id}).then((todos)=>{
//   console.log(todos);
// })
//
// todo.findOne({_id:id}).then((todo)=>{
//   console.log(todo);
// })

// todo.findById(id).then((todo)=>{
//   if(!todo){
//      return   console.log('ID not found');
//   }
//   console.log(todo);
// }).catch((e)=>console.log(e));

users.findById(id).then((email)=>{
  if(!email){
  return   console.log('User not found');
  }
  console.log(email);
}).catch((e)=>console.log(e));
