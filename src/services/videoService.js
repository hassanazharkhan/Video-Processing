import transcribeService from './transcribeService';
import uploadServicetoS3  from './uploadServicetoS3';
import simpleQueueService from './simpleQueueService';

class videoService {

  getFilesPayload = (req) => {
    return req.files.map((file) => {
      return {
        key : file.fileKey,
        path : file.location
      } 
    })
  }

  uploadFinalize = async (req, res, next) => {
    try {
      const payload = this.getFilesPayload(req);
      if(!payload) {
        return res.status(500).json({ Message: 'No payload found in request' });
      }

      const queueResponse = await simpleQueueService.publishToQueue(payload);
      // const transcribeResponse = await transcribeService.transcribe(payloads);
      
      return res.status(201).json({
        Message: 'Successfully uploaded ' + req.files.length + ' files!',
        //transcribeResponse,
        queueResponse
      });

    } catch (err) {
      return res.status(500).json({ Message: err.message });
    }

  };

  uploadFiles = (req, res, next) => {
    const upload = uploadServicetoS3.array('video');
    upload(req, res, function (err) {
      if (err) {
        console.log('Error', err.message)
        return res.status(500).json({ Message: err.message });
      }
      next();
    });
  }; 
}

export default new videoService();
