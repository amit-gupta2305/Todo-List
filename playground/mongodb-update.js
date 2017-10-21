//const mongo = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
 MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
   if (err){
   return    console.log('unable to connect to mongodb server' + err);
   }
   console.log('Connected to Mongo DB');

   db.collection('Todos').findOneAndUpdate({_id:new ObjectID("59e4f9f4ed5e3867d73fc830")},
   {
     $set:{name:'Aamit'},
     $inc:{age:1}
   },{
     returnOriginal:false
   }).then((count)=>{
     console.log(count);
   })

  // db.collection('Todos').insertOne({
  //   text:'done with lunch',
  //   completed:true
  // },(err,res)=>{
  //   if(err){
  //     return console.log('unable to insert record');
  //   }
  //   console.log(res);
  // })
  //

   db.close();
 })
