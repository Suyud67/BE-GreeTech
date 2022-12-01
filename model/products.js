const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productsSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  nm_product: {
    type: String,
    required: true,
  },
  desc_product: {
    type: String,
    required: true,
  },
  img_product: {
    type: String,
    required: true,
  },
  price_product: {
    type: String,
    required: true,
    default: '-',
  },
  date_upload: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Products = model('product', productsSchema);

module.exports = Products;
