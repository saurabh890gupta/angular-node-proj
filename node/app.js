const express = require('express');
const app =express();
const port=4000;
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');
var session = require('express-session');
const path = require('path');
const route1 =require('./Router/route') ;
var mongoose = require('mongoose');
const mongodb = require('mongodb');
var multer = require('multer');
var crypto = require('crypto');
var passport = require('passport');
const fs = require('fs-extra');
const formidable= require('formidable');
//const fileUpload = require('express-fileupload');
var cors = require('cors');
const fetch =require('node-fetch');
// var bcrypt   = require('bcrypt-nodejs');
require("./Database/schema/photo");
var cors = require('cors')


// app.use(express.static(path.join(__dirname, "/public/files/changpassword.html")));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, '../public/uploads/')));
app.use(cookieParser())
app.use(session({
    secret: 'djhxcvxfgshjfgjhgsjhfgakjeauytsdfy', // a secret key you can write your own 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
  


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    //thisd is for angular.js
    //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    //this is for angular 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token,user, multipart/form-data");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(cors()) 

//faceboobk api 
        // var passportFacebook = require('./Controller/facebook');
        // var passport = require('passport');
        // var session = require('express-session');

        // app.use(session({
        //     secret: 's3cr3t',
        //     resave: true,
        //     saveUninitialized: true
        //   }));
        //   app.use(passport.initialize());
        //   app.use(passport.session());
//facebook api end

var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  var cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
  app.get('/example/c', [cb0, cb1, cb2])









app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/', route1);
 
app.listen(port , ()=>{
	console.log('server is started at port ' + port);
});