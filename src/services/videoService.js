import transcribeService from './transcribeService';
import uploadServicetoS3  from './uploadServicetoS3';
import simpleQueueService from './simpleQueueService';

class videoService {
  uploadFinalize = async (req, res, next) => {
    try {
      //const transcribeResponse = await transcribeService.transcribe(req);
      //const payload = { key: req.file.originalname, path: req.file.location, date: (new Date()).toISOString() };
      //const queueResponse = await simpleQueueService.publishToQueue(payload);
      return res.status(201).json({
        Message: 'File Uploaded Successfully',
       // Path: req.file.location,
      //transcribeResponse,
      //queueResponse
      });
    } catch (err) {
      return res.status(500).json({ Message: err.message });
    }
  };

  uploadFile = (req, res, next) => {
    console.log('Info', 'Files Uploading Started')
    const upload = uploadServicetoS3.array('video');
    upload(req, res, function (err) {
      if (err) {
        console.log('Error', err.message)
        return res.status(500).json({ Message: err.message });
      }
      console.log('Info', 'Files Uploading Completed')
      next();
    });
  };
}

export default new videoService();
