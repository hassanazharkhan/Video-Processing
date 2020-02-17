const amqp = require('amqplib/callback_api');
 
amqp.connect('', function (err, conn) {
  conn.createChannel(function (err, ch) {
    console.log("Waiting for messages To exit press CTRL + C",);
    conn.createChannel(function (err, ch) {
      ch.consume('user-messages', function (msg) {
        
        console.log('..... Worker 1');
        console.log(" [x] Received %s", msg.content.toString());

        ch.ack(msg);

        },{ noAck: false });
    });
  });
});