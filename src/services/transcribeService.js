import AWS from 'aws-sdk';
import path from 'path';
import guid from 'uuid/v1';

class transcribeService {
  constructor() {
    this.transcribeService = new AWS.TranscribeService({
      apiVersion: '2017-10-26',
      accessKeyId: process.env.AWS_IAM_USER_KEY,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET,
      region: process.env.REGION
    });
  }

  transcribe = async req => {
    const params = {
      LanguageCode: process.env.LANGUAGE_CODE,
      Media: {
        MediaFileUri: req.file.location
      },
      MediaFormat: path.extname(req.file.originalname).replace('.', ''),
      TranscriptionJobName: req.key,
      OutputBucketName: process.env.AWS_TRANSCRIPTION_BUCKET
    };
  
     const transcribeServiceResult = this.transcribeService.startTranscriptionJob(params, function(err, job) {
        if (err) {
          console.log(err, err.stack);
          return err.stack;
        }
  
        return job;
      }).promise();
  
      return transcribeServiceResult;
  };

}
 
export default new transcribeService()


 