const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const orderSchema = new Schema({
  orderId: ObjectId,
  product: String,
  quantity: Number,
  unitPrice: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;