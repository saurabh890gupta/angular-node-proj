var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var FacebbookSchema = new Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
});

 FacebbookSchema.statics.findOrCreate = require("find-or-create");

module.exports = mongoose.model('FacebbookSchema', FacebbookSchema);