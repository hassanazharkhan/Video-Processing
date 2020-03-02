import multer from 'multer'
import path from 'path'
import uuid from 'uuid/v1';

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, path.join(__dirname, '../../assets/videos'))
  },
  filename: function(req, file, callback) {
    callback(null, uuid() + path.extname(file.originalname))
  }
})

const filefilter = (req, file, callback) => {
  if (file.originalname.match(/\.(mp4)$/i)) {
    callback(null, true)
  } else {
    callback(new Error('only videos are allowed of type mp4.'), false)
  }
}

class uploadLocal {
  upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 20
    },
    fileFilter: filefilter
  })
}

export default new uploadLocal().upload


 
