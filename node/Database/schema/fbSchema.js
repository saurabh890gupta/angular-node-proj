var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var FbSchema = new Schema({
  name: String,
  facebookID:String,
  accessToken:String

  
},{collation:'FbSchema'});

module.exports = mongoose.model('FbSchema', FbSchema);