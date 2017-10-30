const {ObjectID} = require('mongodb');
const {mongoose} = require('./../Server/db/mongoose');
const {todo} =require('./../Server/models/Todo');
const {users}=require('./../Server/models/users');


todo.findByIdAndRemove('59f6f24a728b381ea4752fdd').then((doc)=>{
  console.log(doc)
})
