import amqp from 'amqplib/callback_api';

let ch = null;

amqp.connect(process.env.QUEUE_URL, function(err, conn) {
  conn.createChannel(function(err, channel) {
    ch = channel;
  });
});

export const publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
};

process.on('exit', code => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});
