var amqp = require('amqplib/callback_api');
const mongoose = require('mongoose');
const Order = require('./order');

const rabbitServer = process.env.RABBITMQ_SERVER || '192.168.64.3';
const mongoServer = process.env.MONGODB_SERVER || '192.168.64.3';

amqp.connect(`amqp://user:password@${rabbitServer}`, function (connError, connection) {
    if (connError) {
        throw connError;
    }
    connection.createChannel(function (channError, channel) {
        if (channError) {
            throw channError;
        }
        var queue = 'order';
        var message = {
            product: 'ABC123',
            quantity: 2,
            unitPrice: 4.5
        };
        channel.assertQueue(queue, {
            durable: false
        });
        console.log("[x] Waiting for messages in %s queue", queue);
        channel.consume(queue, function (message) {
            //console.log(message);
            const order = JSON.parse(message.content.toString());
            console.log("[x] Received %s", order);
            storeOrder(order.product, order.quantity, order.unitPrice);
        }, {
            noAck: true
        });
    });
});

async function storeOrder (product, quantity, unitPrice) {
    await mongoose.connect(`mongodb://${mongoServer}/orders`);
    const newOrder = new Order({
        product,
        quantity,
        unitPrice
    });
    await newOrder.save();
}