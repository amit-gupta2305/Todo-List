//const mongo = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
 MongoClient.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/TodoApp',(err,db)=>{
   if (err){
   return    console.log('unable to connect to mongodb server' + err);
   }
   console.log('Connected to Mongo DB');
   db.collection('Todos').insertOne({
     name:'mayur',
     age:27,
     location:'jhansi'
   },(err,res)=>{
     if(err){
       return console.log('Unable to insert the record ' + err);
     }
     console.log('record inserted successfully');
     console.log(JSON.stringify(res.ops,undefined,4));
   })


   db.close();
 })
