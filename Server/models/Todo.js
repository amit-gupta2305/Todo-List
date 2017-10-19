const mongoose = require('mongoose');
var todo = mongoose.model('Todo',{
   text:{
    type:String,
     required:true,
     min:1,
     trim:true
   },
   completed:{
       type:String,
       default: false
   },
   completedAt:{
     type:Number,
     default:null
   }
 });
 module.exports = {todo};
