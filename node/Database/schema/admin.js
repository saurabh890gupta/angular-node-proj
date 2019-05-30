const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Admin = new Schema({
    id: String,
    user_type: String,
    user_name:String,
    email:String,
    password:String,
    address:{
    type:String,
    default:"kumar gali"},
    repeatpassword:String,
    remember:Boolean,
    vrifivation_token:String,
    account_status:Boolean,
},{collection:'Admin'});


module.exports = mongoose.model('Admin', Admin );

