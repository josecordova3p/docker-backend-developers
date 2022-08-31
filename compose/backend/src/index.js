const express = require('express');
const amqp = require('amqplib/callback_api');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/send', (req, res, next) => {
    console.log('Sending...');
    const rabbitServer = process.env.RABBITMQ_SERVER || '192.168.64.3';
    amqp.connect(`amqp://user:password@${rabbitServer}`, function (connError, connection) {
        if (connError) {
            console.log(connError);
            res.status(500).send(connError);
        }
        connection.createChannel(function (channError, channel) {
            if (channError) {
                throw channError;
            }
            var queue = 'order';
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(req.body)));
            console.log("[x] Sent %s", JSON.stringify(req.body));
        });
        setTimeout(function () {
            connection.close();
            res.status(200).send('OK');
        }, 500);
    });
});
app.use('/health', require('express-healthcheck')());

app.listen(process.env.PORT, async() => {
    console.log(`Server is running at ${process.env.PORT}`);
});
