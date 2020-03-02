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

  sendMessage = (params) => {
    return new Promise((resolve, reject) => {
      this.simpleQueueService.sendMessage(params, (error, response) => {
        if (error) {
          console.log("Error", error);
          reject(error);
        } else {
          resolve(response);
        }
      });

    });
  };

  publishToQueue = async (messages) => {
    const simpleQueueServiceResults = new Array();

    for (const message of messages) {
      const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: process.env.AWS_SQS_URL
      };

      let simpleQueueServiceResult = await this.sendMessage(params)
      simpleQueueServiceResults.push(simpleQueueServiceResult);
    }
    return simpleQueueServiceResults
  };
}

export default new simpleQueueService()