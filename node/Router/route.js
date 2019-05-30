const express = require('express');
const router1 = express.Router();
const control = require('../Controller/control');
//var passportFacebook = require('../Controller/facebook');
//const fetch =require('node-fetch');
router1.get('/',control.Home);
//express routing query and path pass in parameter
router1.post('/api/parameter/:name?',control.Parameter);  //pass path and query parameter in express routing
// end express routing query and path pass in parameter
router1.post('/api/signup',control.Signup);
router1.post('/api/login',control.Login);
router1.post('/api/propertydetail',control.Propertydetail);
router1.post('/api/filessubdata',control.FilesSubData);
router1.get('/api/propertydata',control.PropertyData);
router1.get('/api/propertydatascroll',control.PropertyDataScroll);
router1.get('/api/PropertyDataSchema',control.PropertyDataSchema);
router1.post('/api/setNewPassword/?',control.setNewPassword);
router1.post('/api/forgetpassword',control.Forgetpassword);
router1.post('/api/contactus',control.Contactus);
router1.post('/api/upload', control.uplaod);
router1.get('/api/fileGet', control.fileget);
router1.get('/api/logOut',control.logout);
router1.get('/api/signupDataAdmin',control.SignupDataAdmin);
router1.post('/api/signupDataDelete',control.SignupDataDelete);
router1.post('/api/propertyDataDelet',control.PropertyDataDelet);
router1.post('/api/loginwithfb',control.LoginWithFb);
router1.post('/api/sendmsg',control.Sendmsg);
router1.get('/api/testtwilio',control.Testtwilio);
router1.get('/api/whatsappm',control.Whatsappm);
router1.all('/api/example',control.Exmple);
router1.all('/api/testapi',control.Testapi);

//router1.get('/api/logout',control.logoutUser);


// router1.get('/api/facebook',
//   passportFacebook.authenticate('facebook'));

// router1.get('/facebook/callback',
//   passportFacebook.authenticate('facebook', { failureRedirect: '/api/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


//  router1.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }));
//     router1.get('/auth/facebook',passport.authenticate('facebook', { scope: 'email' }));

module.exports = router1;


