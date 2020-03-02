import AWS from 'aws-sdk';
import { extname as getFileExtention } from 'path';

class transcribeService {
  constructor() {
    this.transcribeService = new AWS.TranscribeService({
      apiVersion: '2017-10-26',
      accessKeyId: process.env.AWS_IAM_USER_KEY,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET,
      region: process.env.REGION
    });
  }

  startTranscriptionJob = (params) => {
    return new Promise((resolve, reject) => {
      this.transcribeService.startTranscriptionJob(params, function (err, response) {
        if (err) {
          console.log(err, err.stack);
          reject(err.stack);
        } else {
          resolve(response);
        }
      })
    });
  }

  transcribe = async (files) => {
    const transcribeServiceResults = new Array();
    for (const file of files) {
      let params = {
        LanguageCode: process.env.LANGUAGE_CODE,
        Media: {
          MediaFileUri: file.location
        },
        MediaFormat: getFileExtention(file.originalname).replace('.', ''),
        TranscriptionJobName: file.fileKey,
        OutputBucketName: process.env.AWS_TRANSCRIPTION_BUCKET
      };

      let transcribeServiceResult = await startTranscriptionJob(params);
      transcribeServiceResults.push(transcribeServiceResult);
    }

    return transcribeServiceResults;
  };

}

export default new transcribeService()


