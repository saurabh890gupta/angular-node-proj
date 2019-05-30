const express = require('express');
const app = express();
var async = require("async");
const upload = require('./ uplaod');
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const path = require('path');


//all schema 
require('../config/dbconfig');
require('../Database/schema/users');
require('../Database/schema/admin');
require('../Database/schema/propertydata');
require('../Database/schema/file');
require('../Database/schema/contactus');
require('../Database/schema/photo');
require('../Database/schema/fbSchema');
// all schema end

// all models
const user = mongoose.model('Users');
const fbSchema = mongoose.model('FbSchema');
const admin = mongoose.model('Admin');
const propertySchemas = mongoose.model('propertySchema');
const Filesdata = mongoose.model('Filesdata');
const Contactus = mongoose.model('Contactus');
const Photo = mongoose.model('Photos');
// all models end

var nodemailer = require('nodemailer');
//var multer = require('multer');
var http = require('http');
//var fs = require('file-system');
var request = require('request');
var storage = require('storage');
var base64 = require('base-64');
var session = require('express-session');
var sess;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
var fs = require('fs');
const fetch =require('node-fetch');
var jwt = require('jsonwebtoken');
var config = require('../Controller/comsecret');

const Nexmo = require('nexmo')
const nexmo = new Nexmo({
    apiKey: '72da6162',
    apiSecret: 'p2asv7YnXpuHBMHV'
  },{debug:true});


module.exports.Home = (req, res) => {
    res.render('home');
}

// An array of callback functions can handle a route. For example:
var cb0 =  (req, res, next)=> {
    console.log('CB0')
    next()
  }
  
  var cb1 = (req, res, next)=> {
    console.log('CB1')
    next()
  }
  
  var cb2 = (req, res)=> {
    res.send('Hello from C!')
  }
  module.exports.Exmple=[cb0, cb1, cb2];

  
//postman parameter=> http://localhost:4000/api/parameter/www.url.com?_id=5c0a6067375e7f4b2c7e2f25
module.exports.Parameter = (req, res) => {
     console.log("path pass",req.params); //for path print
     console.log("query parms",req.query) ;  // for query print
     try {
        //user.findOne({_id:  { $in : [ req.query]}})
        user.findOne({_id:req.query})
            .then((result) => {
                res.send(result);
                res.send("succefully get");
            }
            );
    }
    catch (err) {
        throw err;
    }
    
}


var rn = require('random-number');
var options = {
    min: 1001,
    max: 10000,
    integer: true
}
rn(options)
// console.log('optionssss=>',rn(options));

module.exports.Testapi = (req, res) => {
    var number=req.body.number;
    number = number.split(",");
    console.log("numberrrrr",number);
    console.log('optionssss=>',rn(options));
    var phone = req.body.phone;
    phones = phone.split(",");
    console.log("phone no",phones);
    var email = req.body.email;
    emails = email.split(",");
    console.log("email no",emails);
    var otp=rn(options);
    var k=0;
    var number=[];
    number.forEach(function(item,index,array){

        console.log("all things",item, index ,array);
          k+=number(item);
        console.log('item',k);    
       
    })
    console.log("items",k);
    // array is 
    phones.forEach(function(item, index, array) {
        console.log("all things",item, index ,array);
        // client.messages.create(
        // {
        //     to: item,
        //     from: '+19033041938',
        //     body: otp,
        // },
        // (err, message) => {
        //     console.log(message.sid);
        // }
        // );
    });
}




//old login api

// module.exports.Login = (req, res) => {
//     console.log(req.body);//tells the angualr data  what is data
//     sess = req.session;
//     user.findOne({ email: req.body.email, password: req.body.password })
//         .then((result) => {
//             if (result != null) {
//                 console.log("Sam", result);
//                 req.session.result = result;
//                 res.send("login successful");
//             }
//             else {
//                 console.log(result);
//                 res.send("unsuccessful");
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send("hello");
//         })
// }


//old login api end


module.exports.Login = (req, res) => {
    console.log(req.body);//tells the angualr data  what is data
    sess = req.session;
    user.find({ email: req.body.email})
        .then((result) => {
            console.log("result find",result[0].password);
            console.log(req.body.password);
            bcrypt.compare(req.body.password, result[0].password, (error, result) => {
                console.log("result find bcrypt",result,error);
                    if (result){
                         console.log("Sam", result);
                        // req.session.result = result;
                        // res.send("login successful");
                     //   req.session.result= result.dataValues;
                        var data="login successful";
                       
                        var token = jwt.sign({ id: result._id }, config.secret, {
                            expiresIn: 86400 // expires in 24 hours
                          });
                          console.log("tokennnnnnnnnnnnn",token)
                          res.status(200).send({ auth: true, token: token,data });
                        }
                    else {
                        console.log(result);
                        //res.send("unsuccessful"); //this is not json formate
                        res.send({error:"unsuccessful"}); // for json format
                    }
            })
        })
        .catch((err) => {
            console.log(err);
            res.send("hello");
        })
}
//logout api


module.exports.logout = (req, res) => {
    console.log(req.session);
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send(err.message, res);
        }
        else {
            //res.send('User logged out successfully!', res, {});
            res.send({data:"User logged out successfully!"});
        }
    });
};


//logout api end

module.exports.Signup = (req, res) => {
    //  console.log("path pass",req.params); //for path print
    // console.log("query parms",req.query) ;  // for query print
    console.log("hello signup data",req.body);
//this is use for email is necessary
    if(req.body.email==''){
        res.send({error:"email id required"}); 
    }
    user.findOne({ email: req.body.email })
        .then((result) => {
            if (result != null) {
                console.log("Sam", result);
               // res.send("user exist");
               res.send({result:"user exist"});
            }
            else {
                bcrypt.hash(req.body.pass, saltRounds, function(err, hash) 
               
                {
                    if (err) 
                    {
                        return res.status(500).json({error: err})
                    }
                    else {
                        //this is use for angular remember condtion false
                        if(req.body.remember==''){
                            req.body.remember=false;
                        }
                        async.series({
                            user: function (callback) {
                                const mydata = {
                                    user_name: req.body.name,
                                    email: req.body.email,
                                    password: hash,
                                    repeatpassword: hash,
                                    comments: [{email: req.body.email},{pincode:"210427"}],
                                    remember: req.body.remember,   
                                }
                                console.log('this is my data', mydata);
                                new user(mydata).save().then(data => {
                                    var result="signup successful"
                                        var token = jwt.sign({ id: data._id }, config.secret, {
                                        expiresIn: 86400 // expires in 24 hours
                                        });
                                      console.log("sign token",token)
                                      res.status(200).send({ auth: true, token: token,result });
                                    // res.send({data});
                                    // console.log("hfdjghdfjkghdjfghdjghdfhgd",data)
                                    // res.send({data:data});
                                    console.log('succefull data');

                                    //mail varifie
                                    var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'jssaurabh.gupta786@gmail.com',
                                            pass: 'Kumar@123'
                                        }
                                    });
                                    var maillist = [mydata.email, 'jssaurabh.gupta786@gmail.com'];
                                    var mailOptions = {
                                        from: 'jssaurabh.gupta786@gmail.com',
                                        to: maillist,
                                        subject: 'Sending Email using saurabhProperty',
                                        text: 'you are success fully signup! in "" '  + mydata.email,

                                    };
                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            console.log('Email sent: ' + info.response);
                                        }
                                    });
                                   
                                    //mail varifie


                                })
                                    .catch((err) => {
                                        console.log(err);
                                      //  res.send("hello");
                                        res.send({err:"hello"});
                                    })

                            }
                        })
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.send("hello");
        })

}

//express routing query and path pass in parameter


module.exports.Propertydetail = (req, res) => {
    async.series({
        propertySchemas: function (callback) {
            const mypropertydata = {
                propertyimage: req.body.propertyimage,
                propertyname: req.body.propertyname,
                propertyprice: req.body.propertyprice,
                phone: req.body.phone,
                propertydescreption: req.body.propertydescreption,
                propertystate: req.body.propertystate,
                propertycity: req.body.propertycity,
                propertystatus: req.body.propertystatus,
                propertyleaseperioud: req.body.propertyleaseperioud,
                propertyminbed: req.body.propertyminbed,
                propertyarea: req.body.propertyarea,
                propertySwimmingpool: req.body.propertySwimmingpool,
                propertyStories: req.body.propertyStories,
                propertyexit: req.body.propertyexit,
                propertyrireplace: req.body.propertyrireplace,
                propertylaundryroom: req.body.propertylaundryroom,
                propertyJogpath: req.body.propertyJogpath,
                propertyCeilings: req.body.propertyCeilings,
                propertyDualsink: req.body.propertyDualsink,
                imageSrc: req.body.imageSrc,
                propertyVideo1: req.body.propertyVideo1,
                propertyVideo2: req.body.propertyVideo2,
                propertyVideo3: req.body.propertyVideo3,
                checkBox: req.body.checkBox,
            }
            console.log('this is my data', mypropertydata);
            new propertySchemas(mypropertydata).save()
                .then(data => {
                    res.send(data);

                    console.log('succefull data');
                })
                .catch((err) => {
                    console.log(err);
                    res.send("hello");  //mail varifie
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'jssaurabh.gupta786@gmail.com',
                            pass: 'Kumar@123'
                        }
                    });
                    var maillist = [mydata.email, 'jssaurabh.gupta786@gmail.com'];
                    var mailOptions = {
                        from: 'jssaurabh.gupta786@gmail.com',
                        to: maillist,
                        subject: 'Sending Email using saurabhProperty',
                        text: 'you are success fully signup! in' + mydata.email,

                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    //mail varifie

                })

        }
    })
}

module.exports.FilesSubData = (req, res) => {
    console.log(req.body);
    async.series({
        Filesdata: function (callback) {
            const myfiledata = {
                fimage: req.body.fimage,
                fname: req.body.fname,
                fprice: req.body.fprice,
            }
            console.log('this is my data', myfiledata);
            new Filesdata(myfiledata).save()
                .then(data => {
                    res.send(data);
                    console.log('succefull data');
                })
                .catch((err) => {
                    console.log(err);
                    res.send("hello");
                })

        }
    })
}


exports.PropertyDataScroll = (req, res) => {
    try {
        Filesdata.find()
            .then((result) => {
                res.send(result);
                console.log("img data found", result);
            });
    }
    catch (err) {
        throw err;
    }
}

exports.PropertyDataSchema = (req, res) => {
    try {
        propertySchemas.find()
            .then((result) => {
                res.send(result);
                console.log("propertydata api found", result);
            }
            );
    }
    catch (err) {
        throw err;
    }
}
exports.PropertyDataDelet = (req, res) => {
    try {
        propertySchemas.deleteOne({_id:req.body._id})
            .then((result) => {
                res.send("Done");
                console.log("property Data delete from DATABASE", result);
            }
            );
    }
    catch (err) {
        throw err;
    }
}

exports.PropertyData = (req, res) => {
    try {
        Filesdata.find()
            .then((result) => {
                res.send(result);
                console.log("property data find ", result);
            }
            );
    }
    catch (err) {
        throw err;
    }
}

exports.SignupDataAdmin = (req, res) => {
    try {
        user.find()
            .then((result) => {
                res.send(result);
                console.log("Signup Data Found FOR Admin", result);
            }
            );
            
    }
    catch (err) {
        throw err;
    }
}

exports.SignupDataDelete = (req, res) => {
    console.log("response of delete function",req.body);
    try {
        user.deleteOne({email:req.body.email})
            .then((result) => {
                res.send("Done");
                console.log("Signup Data delete from DATABASE", result);
            }
            );
            
    }
    catch (err) {
        throw err;
    }
}
//forget password using link
module.exports.Forgetpassword = (req, res) => {
    console.log(req.body);
    user.findOne({ email: req.body.email })
        .then((result) => {
            if (result != null) {
                console.log("Sam", result);
                //res.send("user exist"); //its work for angularjs
                res.send({res:"user exist"}); //its work for angular
                //mail varifie
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'jssaurabh.gupta786@gmail.com',
                        pass: 'Kumar@123'
                    }});
                var maillist = [result.email, 'jssaurabh.gupta786@gmail.com'];
                var mailOptions = {
                    from: 'jssaurabh.gupta786@gmail.com',
                    to:  maillist,
                    subject: 'Sending Email using Node.js',
                    text: 'you are success fully login!',
                    html: '<b>Hello world?</b><br><a href="http://127.0.0.1:8080/#!/Forgetpassword?email='+result.email+'">My web</a>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                //mail varifie
            }
            else {
                console.log("error result", result);
               // res.send("user not exist"); //for angularjs
                res.send({err:"user not exist"}); // for angular

            }
        })
        .catch((err) => {
            console.log(err);
           // res.send("Result not found");//for angularjs
            res.send({err:'Result not found'});// for angular
        })

}

//forget password using link end


module.exports.setNewPassword = (req, res) => {
    console.log(req.body);
    console.log("query parms",req.query);
        console.log("query parms data find",req.query.email);
    if (req.body && req.body.email && req.body.pass && req.body.repeatPass) {
        user.findOne({ email: req.body.email }).exec(function (err, email) {
            //last check if passwords are matching
            if (req.body.pass != req.body.repeatPass || err || !email) {
                if (req.body.pass != req.body.repeatPass) {
                    res.send("Passwords are not matching!");
                }
                else {
                    res.send("User not found");
                }
            }
            else {
                user.findOne({ email: req.body.email }).exec(function (err, email) {
                    if (err || !email) {
                        res.send("User not found");
                                                
                    }
                    else {
                        bcrypt.hash(req.body.pass, saltRounds, function(err, hash) 
               
                        {
                        user.updateOne({ email: req.body.email }, { $set: { password: hash, repeatpassword: hash,} }, function (err, email) {
                            console.log("id is", email);
                            res.send("login successful");
                        });
                    });
                    }
                })
            }
        })
    }
    else {
        return res.status(500).json({ message: "Not all required data is provided" })
    }
}

//when email field not found using query parameter
// module.exports.setNewPassword = (req, res) => {
//     console.log("query parms",req.query);
//     console.log("query parms data find",req.query.email);
//     console.log(req.body);
//     if (req.body && req.body.pass && req.body.repeatPass && req.query.email) {
//         user.findOne({ email: req.query.email}).exec(function (err, email) {
//             //last check if passwords are matching
//             if (req.body.pass != req.body.repeatPass || err || !email) {
//                 if (req.body.pass != req.body.repeatPass) {
//                     res.send("Passwords are not matching!");
//                 }
//                 else {
//                     res.send("User not found");
//                 }
//             }
//             else {
//                 user.findOne({ email: req.query.email }).exec(function (err, email) {
//                     if (err || !email) {
//                         res.send("User not found");
                                                
//                     }
//                     else {
//                         bcrypt.hash(req.body.pass, saltRounds, function(err, hash) 
               
//                         {
//                         user.updateOne({ email: req.query.email }, { $set: { password: hash, repeatpassword: hash,} }, function (err, email) {
//                             console.log("id is", email);
//                             res.send("login successful");
//                         });
//                     });
//                     }
//                 })
//             }
//         })
//     }
//     else {
//         return res.status(500).json({ message: "Not all required data is provided" })
//     }
// }
// end when email field not found using query parameter


module.exports.Sendmsg = (req, res) => {
    console.log(req.body);
    const number=req.body.number;
    const query=req.body.query;
    nexmo.message.sendSms(
        'Nexmo',917398894383, query, {type:'unicode'},
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
            }
          }
       );
}

module.exports.Contactus = (req, res) => {
    console.log("contact data which is find", req.body);
    const query=req.body.query;
    // const contact=req.body.contact;
    nexmo.message.sendSms(
        'Nexmo',917398894383, query, {type:'unicode'},
          (err, responseData) => {
            if (err) {
              console.log(err);
            } else {
              console.dir(responseData);
            }
          }
       );
    async.series({
        Contactus: function (callback){
            const formData = {
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address,
                query: req.body.query
            }
            console.log("my contact form data", formData);
            new Contactus(formData).save()
                .then(data => {
                    res.send(data);
                    console.log("contact successfully");
                    //   nexmo.message.sendSms(
                    //       'Nexmo',917398894383, query, {type:'unicode'},
                    //          (err, responseData) => {
                    //             if (err) {
                    //                 console.log(err);
                    //             } else {
                    //                 console.dir(responseData);
                    //             }
                    //       }
                    //    );
                     
                    //mail varifie
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'jssaurabh.gupta786@gmail.com',
                            pass: 'Kumar@123'
                        }
                    });
                    var maillist = [formData.email, 'jssaurabh.gupta786@gmail.com'];
                    var mailOptions = {
                        from: 'jssaurabh.gupta786@gmail.com',
                        to: maillist,
                        subject: 'Sending Email using saurabhProperty',
                        text: 'contact by ' + formData.email + " " + " " + formData.contact,

                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    //mail varifie end

                })
                .catch((err) => {
                    res.send(err);
                    console.log("err in save data");

                })
        }
    })

}
module.exports.FilesSubData = (req, res) => {
    console.log(req.body);
    async.series({
        Filesdata: function (callback) {
            const myfiledata = {
                fimage: req.body.fimage,
                fname: req.body.fname,
                fprice: req.body.fprice,
            }
            console.log('this is my data', myfiledata);
            new Filesdata(myfiledata).save()
                .then(data => {
                    res.send(data);
                    console.log('succefull data');
                })
                .catch((err) => {
                    console.log(err);
                    res.send("hello");
                })

        }
    })
}


// module.exports.fileget = (req, res, next) => {

//     Photo.find({}, ['path', 'caption'], { sort: { _id: -1 } }, function (err, result) {
//         //   res.render('home', 
//         //     { 
//         //     title: 'NodeJS file upload tutorial', 
//         //     msg:req.query.msg,
//         //     photolist : photos 
//         //     });
//         res.send(result);

//         console.log("img data found", result);
//     });
//     // console.log("file path",photolist);
// }



//require('events').EventEmitter.defaultMaxListeners = Infinity;

module.exports.fileget = (req, res, next) =>  {
    console.log("hit")
    var ph;
    //model is a mongodb model object for the schema
    Photo.find({}, function(err, result) {
        console.log("data find of file",result);
       
    //  result.forEach(function(pic) {
        
    //  ph = pic['path'];
    //  console.log("kl",ph);

    //  var array3 = new Array;
    //  array3.push(ph);

    //  console.log('aaaaaaaaaaaaaaa',array3);
  
   //
   
   console.log("klvs",result[0].path);
    res.sendFile(path.join(__dirname, '../public/'+result[0].path));
//    res.writeHead(200, {'Content-Type': 'image/jpeg'||'image/png'||'image/jpg'} );
//    //res.contentType('image/jpeg')
//     console.log("dhgfjkdghdfjkgh",ph);
//    res.end(ph, 'binary');

//  })
 });
}

// module.exports.fileget=(req, res, next)=>{
//     console.log("Get cake function");
//     Photo.find(function (err, doc) {
//         if (err) return next(err);
//         console.log("hell",doc[0]);
//     var base64 = (doc[0].path.toString('base64'));
//      res.send(base64);

//     });
// };



module.exports.uplaod = (req, res) => {
    console.log(req.body);
    upload(req, res, (err) => {
        if (err) {
            res.render('home', {
                msg: err
            });
        }
        else {
            if (req.file == undefined) {
                res.render('home', {
                    msg: 'Error: no file selected!'
                });
            }
            else {
                var fullPath = 'uploads/' + req.file.filename
                var document = {
                    path: fullPath,
                    caption: req.body.caption
                };
                var photo = new Photo(document);
                photo.save(function (error) {
                    if (error) {
                        throw error;
                    }
                    // else{
                    //     res.render('home',{
                    //     file:fullPath ,
                    // })
                    // }
                    res.redirect('/?msg=1');
                });

            }
        }
    });
};

module.exports.LoginWithFb=async(req ,res)=>{
// app.post('/login-with-facebook',async (req ,res)=>{
    const{ accessToken ,userID,name } = req.body
    console.log("somthing data find",userID,accessToken,name)
    const response=await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    console.log("facebook pas",response)
    const json =await response.json()
    console.log("facebook name data find",json.name);
    if(json.id === userID)
    {
    console.log('json.')
        const result = await fbSchema.findOne({facebookID : userID })
        if(result){
            console.log('all result find ',result);
            res.json({status:'ok', data:'you are logged in'})
        }
        else{
            const person= new fbSchema({
                name:json.name,
                facebookID:userID,
                accessToken
            })
            await person.save()
            res.json({status:'ok', data: 'you are registerd'})
        }
    }
    else{
    //odifjsdoi
    res.json({status:'ok', data: 'dont try to this'})
   }
};




 //require('../Database/schema/logout');

// module.exports.logoutUser=(req,res)=>{
//   logout.logoutUser((err, data)=> {
//     if (err) {
//       res.json({ 'error': data.error, 'message': data.message });
//     } else {
//       res.json({ 'success': data.success, 'message': data.message });
//     }
//   });
// };




// var logout = function(){};

// logout.prototype.logoutUser = function(req, res, callback){
//     var sess = req.session.user;
//     if(sess){
//         req.session.user = null;
//         return callback(null, {'success': true, "message": "user logout successfully"});
//     }
//     callback(null, {'success': true, "message": "user logout successfully"});
// }

// module.exports = new logout();


// router.post('/logout', function(req, res) {
//     logout.logoutUser(req, res, function(err, data) {
//       if (err) {
//         res.json({ 'error': data.error, 'message': data.message });
//       } else {
//         res.json({ 'success': data.success, 'message': data.message });
//       }
//     });
//   });

//   module.exports = router;




// //logout system
// module.exports.logoutUser = (req, res)=> {
//     //  if(req.user.facebook){
//     //     var user = {};
//     //     user.facebook = {};
//     //       User.findByIdAndUpdate(req.user._id, { $set: user }, { new: true }, function (err, userUpdated) {

//     //     });
//     //  }
//     req.logout();
//     res.status(200).json({message: 'Succesfully logged out'});
// }
// //end logout system





//passport facebook

// var FacebookStrategy = require('passport-facebook').Strategy;
// var session = require('express-session')

// module.exports= function(passport){


//   app.use(passport.initialize());
//   app.use(passport.session());
//   app.use(session({secret: 'keyboard cat',resave: false,saveUninitialized: true,cookie: { secure: false }
//   }))

//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   passport.deserializeUser(function(id, done) {
//     user.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });

//     passport.use('facebook',new FacebookStrategy({
//         clientID: FACEBOOK_APP_ID,
//         clientSecret: FACEBOOK_APP_SECRET,
//         callbackURL: "http://localhost:4000/auth/facebook",
//         profileFields: ['id', 'displayName', 'photos', 'email']
//       },
//       function(accessToken, refreshToken, profile, done) {
//           console.log(profile);
//         // user.findOrCreate(..., function(err, user) {
//         //   if (err) { return done(err); }
//         //   done(null, user);
//         // });
//         done(null,profile);
//       }
//     ));


//     return passport;
// }

// //end facebook passport

// send otp 

// module.exports.sendOtp=(req ,res)=>{
//     sessionInfo = req.session;
//     const userID=req.body.id;
//     const data={
//     _id : userID
//     }
     
//     helper.sendOtp(data,function(result){
//     console.log(result);
//     var response={};
//     if(result.process){
//     sessionInfo.otpData={
//     id : userID,
//     otp : result.otp
//     };
//     response.otpCreated = true;
//     }else{
//     response.otpCreated = false;
//     response.message = result.message;
//     }
//     response.message = result.message;
     
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(JSON.stringify(response));
//     });
//     };
 
    

//     //varifie otp

//     app.post('/verifyOtp', function(req, res){
//         sessionInfo = req.session;
         
//         const data={
//         otp : req.body.otp,
//         id : req.body.id
//         }
//         const otpData = sessionInfo.otpData;
         
//         helper.verifyOtp(data,otpData,function(result){
//                 res.writeHead(200, {'Content-Type': 'text/plain'});
//                 res.end(JSON.stringify(result));
//             });
//     });
         



const accountSid = 'ACe2d125a7edb7a24dfbf558ff05e6b34c';
const authToken = '13d48d283b6f8eeea9858aec05db92b9';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);
module.exports.Testtwilio=(req ,res)=>{
    console.log("twilio no ",req.body);
    const number=req.body.number;
    const query=req.body.query;
    console.log(number+"   " +"  "+ query); 
client.messages.create(
  {
    to: number,
    from: '+19033041938',
    body: query,
  },
  (err, message) => {
    console.log(message.sid);
  }
);
}


module.exports.Whatsappm=(req ,res)=>{
client.messages
      .create({
        body: 'Hello there!',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:7398894383'
      })
      .then(message => console.log(message.sid))
      .done();
    }
// app.post('/sms', function(req, res) {
//   var twilio = require('twilio');
//   var twiml = new twilio.TwimlResponse();
//   twiml.message('The Robots are coming! Head for the hills!');
//   res.writeHead(200, {'Content-Type': 'text/xml'});
//   res.end(twiml.toString());
// });




   
// async function sendemilifnot(req, res) {
//     console.log('optionssss=>',rn(options));
//     var phone = req.body.phone;
//     phone = phone.split(",");
//     var email = req.body.email;
//     email = email.split(",")
//     console.log('phones=>',phone);
//     console.log('emails=>',email);
//     var opt = {
//         email: email,
//         phone: phone,
//         otp: rn(options)
//     }
    
//     if (!email && !phone) {
//         return res.send({ message: 'please enter email or phone' });
//     }

//     var users = await User.find({
//         $or: [
//             { email: email },
//             { phone: phone }
//         ]
//     });
   
//     console.log('opttttt',opt);
//     if (users.length == 0) {
//         console.log('user already exist');
//         var userdata = new UserData(opt).save().then(
//             data => {
//                 phone.forEach(number=>{             
//                     number = '+91' + number
//                     console.log("number=>",number);
//                     client.messages.create(
//                         {
//                             to: number,
//                             from: '+18432856106',
//                             body: opt.otp,
//                         },
//                         (err, message) => {
//                               console.log('success',message.sid);
//                             //  console.log('error',err);
//                             //res.send(message.sid);
//                         }
//                     );
//                 })
//                 //console.log("qwerty", client.messages);
               
//             },
//             error => {
//                 res.json({
//                     Error: true,
//                     message: 'User Data not Saved',
//                     data: error
//                 });
//             }
//         );
//     } else {

//         res.status(203).send({ message: 'user already registerd' });
//     }
// }
// Twilio Credentials