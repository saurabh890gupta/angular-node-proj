const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Filesdata = new Schema({
    id: String,
    user_type: String,
    fimage:String,
    fname:String,
    fprice:String,
    path:  { type: String },
    caption: { type: String }
},{collection:'Filesdata'});


module.exports = mongoose.model('Filesdata', Filesdata );