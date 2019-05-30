
const express= require('express');
const app = express();
const multer = require('multer');
const path   = require('path');


/** Storage Engine */
// const storageEngine = multer.diskStorage({
//   destination: '../uploads/',
//   filename: function(req, file, cb){
//     cb(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
//   }
// }); 

// //init

// const upload =  multer({
//   storage: storageEngine,
//   limits: { fileSize:1000000 },
//   fileFilter: function(req, file, callback){
//     checkFileType(file, callback);
//   }
// }).single('photo');


// // var validateFile = function(file, cb ){
// //   allowedFileTypes = /jpeg|jpg|png|gif/;
// //   const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
// //   const mimeType  = allowedFileTypes.test(file.mimetype);
// //   if(extension && mimeType){
// //     return cb(null, true);
// //   }else{
// //     cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
// //   }
// // }

//         function checkFileType(file ,cb){
//             //Allow ext
//                             const filetypes=/jpeg|jpg|png|gif/;
//             //check ext
//                             const extname =filetypes.test( path.extname(file.originalname).toLowerCase());
            
//             //check mime
//                             const mimetype =filetypes.test(file.mimetype);
    
//                             if(mimetype && extname){
//                                 return cb(null,true);
//                             }
//                             else{
//                                 cb('Error:Images Only!');
//                             }
//         }
    




const storage =multer.diskStorage({destination: './public/uploads',filename: function(req,file,cb)
  {
    cb(null,file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload =multer({storage :storage , limits:{filesize: 1000000},fileFilter : function(req , file ,cb)
  {
    checkFileType(file ,cb);
  }
}).single('myImage');

function checkFileType(file ,cb){
  const filetypes=/jpeg|jpg|png|gif/;
  const extname =filetypes.test( path.extname(file.originalname).toLowerCase());
  const mimetype =filetypes.test(file.mimetype);
  if(mimetype && extname){
      return cb(null,true);
  }
  else{
      cb('Error:Images Only!');
  }
}

module.exports = upload;