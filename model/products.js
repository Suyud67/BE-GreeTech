const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productsSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  nm_product: {
    type: String,
    require: true,
  },
  desc_product: {
    type: String,
    require: true,
  },
  img_product: {
    type: String,
    require: true,
  },
  price_product: {
    type: Number,
    require: true,
  },
  date_upload: {
    type: Date,
    require: true,
    default: Date.now(),
  },
});

const Products = model('product', productsSchema);

module.exports = Products;
