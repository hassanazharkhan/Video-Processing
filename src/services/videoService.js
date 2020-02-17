import { transcribe as transcribeMiddleware } from '../middleware/transcribe';
// import { upload as uploadMiddleware } from '../middleware/uploadS3';
import { upload as uploadMiddleware } from '../middleware/uploadLocal';
import { publishToQueue as processQueue } from '../services/msmqService';

class videoService {
  uploadFinalize = async (req, res, next) => {
    try {

      const response = 'await transcribeMiddleware(req);';

      let queueName = 'user-messages';
      let payload = { key: req.file.originalname, path: req.file.path };

      await processQueue(queueName, payload);
      return res.status(201).json({
        Message: 'File Uploaded Successfully',
        Path: req.file.path,
        response
      });
    } catch (err) {
      return res.status(500).json({ Message: err.message });
    }
  };

  uploadFile = (req, res, next) => {
    const upload = uploadMiddleware.single('video');
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ Message: err.stack });
      }
      next();
    });
  };
}

export default new videoService();
