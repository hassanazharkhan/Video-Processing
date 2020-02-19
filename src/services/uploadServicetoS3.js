import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import uuid from 'uuid/v1';
import path from 'path';


class uploadServicetoS3 {
  constructor(){
    this.fileKey = uuid();
    this.S3folderPath = undefined;
    
    this.s3Config = new AWS.S3({
      accessKeyId: process.env.AWS_IAM_USER_KEY,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET,
      Bucket: process.env.AWS_BUCKET_NAME
    })

    this.multerS3Config = multerS3({
      s3: this.s3Config,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        console.log(file);
        cb(null, S3folderPath + '/' + fileKey + path.extname(file.originalname));
      }
    })
  }

  fileFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4' || file.mimetype === 'audio/mpeg') {
      file.mimetype === 'video/mp4'
        ? (S3folderPath = 'videos')
        : (S3folderPath = 'audios');
  
      req.key = fileKey;
  
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  upload = multer({
    storage: this.multerS3Config,
    fileFilter: this.fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 20 // we are allowing only 20 MB files
    }
  })

}

export default new uploadServicetoS3().upload

// const s3Config = new AWS.S3({
//   accessKeyId: process.env.AWS_IAM_USER_KEY,
//   secretAccessKey: process.env.AWS_IAM_USER_SECRET,
//   Bucket: process.env.AWS_BUCKET_NAME
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'video/mp4' || file.mimetype === 'audio/mpeg') {
//     file.mimetype === 'video/mp4'
//       ? (S3folderPath = 'videos')
//       : (S3folderPath = 'audios');

//     req.key = fileKey;

//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const multerS3Config = multerS3({
//   s3: s3Config,
//   bucket: process.env.AWS_BUCKET_NAME,
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   metadata: function(req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function(req, file, cb) {
//     console.log(file);
//     cb(null, S3folderPath + '/' + fileKey + path.extname(file.originalname));
//   }
// });

// export const upload = multer({
//   storage: multerS3Config,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 20 // we are allowing only 20 MB files
//   }
// });
