
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var users = new Schema({
    id: String,
    user_type: String,
    user_name:String,
    email:String,
    password:String,
    address:{
    type:String,
    default:"kumar gali"},
    comments:[
        { email: String, 
            date: {
                type:Date,
                default:Date.now
            },
            pincode:String
        }
    ],
    repeatpassword:String,
    remember:Boolean,
    vrifivation_token:String,
    token: String,
    account_status:Boolean,
},{collection:'Users'});


module.exports = mongoose.model('Users', users );

