//const mongo = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
 MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
   if (err){
   return    console.log('unable to connect to mongodb server' + err);
   }
   console.log('Connected to Mongo DB');

   db.collection('Todos').deleteMany({text:'do 50 push ups'}).then((count)=>{
     console.log(count);
   },(err)=>{
     console.log('Unable to fetch the reocrd');
   })


   db.close();
 })
