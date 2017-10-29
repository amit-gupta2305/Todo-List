const {ObjectID} = require('mongodb');
const {mongoose} = require('./../Server/db/mongoose');
const {todo} =require('./../Server/models/Todo');
const {users}=require('./../Server/models/users');

todo.remove({}).then((res)=>{
  console.log(res);
})
