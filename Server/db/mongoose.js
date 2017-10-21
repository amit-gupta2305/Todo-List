const mongoose = require('mongoose');
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://myuser:myuser@ds227565.mlab.com:27565/TodoApp'
};
mongoose.Promise = global.Promise;
 mongoose.connect( `{db.localhost} || {db.mlab}`);
module.exports = {mongoose};
