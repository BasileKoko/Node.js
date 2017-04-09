var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db = mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose, db};

/* These below are all the same
module.exports.mongoose = mongoose
module.exports = {
  (property) mongoose: mongoose (variable);
}*/
