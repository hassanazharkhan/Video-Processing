import AWS from 'aws-sdk';

class simpleQueueService {
  constructor() {
    this.simpleQueueService = new AWS.SQS({
      apiVersion: '2017-10-26',
      accessKeyId: process.env.AWS_IAM_USER_KEY,
      secretAccessKey: process.env.AWS_IAM_USER_SECRET,
      region: process.env.REGION
    });
  }

  publishToQueue = async payload => {
    const params = {
      MessageBody: JSON.stringify(payload),
      QueueUrl: process.env.AWS_SQS_URL
    };

    const simpleQueueServiceResult = this.simpleQueueService.sendMessage(params, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          return err.stack;
        }

        return data;
      }).promise();

    return simpleQueueServiceResult;
  };
}



export default new simpleQueueService()