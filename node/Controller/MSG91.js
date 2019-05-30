const API_KEY = '{{API_KEY}}';
const SENDER_ID = "VERIFY";
const ROUTE_NO = 4;
 
/* msg91 constants starts */
 
var msg91 = require("msg91")(API_KEY, SENDER_ID, ROUTE_NO );
 
const self={
    sendSms : function(OTP,mobileNo,callback){
 
    var MESSAGE = "Welcome to codershood.info. your OTP is "+OTP;
 
msg91.send(mobileNo, MESSAGE, function(err, response){
callback(err,response);
});
}
}
module.exports = self;