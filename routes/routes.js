const express = require('express');
const { check, validationResult } = require('express-validator');
const routes = express();

// import model db
const Products = require('../model/products');

// handle form or post method
routes.use(express.urlencoded({ extended: false }));

// todo: make routes
// get data products from database
routes.get('/products', async (req, res) => {
  const products = await Products.find();

  res.status(200).json({
    error: false,
    products,
  });
});

// get product by id from db
routes.get('/products/detail/:id', async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id });
    res.status(200).json({
      error: false,
      product,
    });
  } catch (err) {
    res.status(404).json({
      error: true,
      message: 'Product is not found!',
    });
  }
});

// handle post req from form add product
routes.post(
  '/product/add',
  [
    check('img_product').custom((value) => {
      // get img value and split it
      const imgChunk = value.split('.');
      [valueImg, ext] = imgChunk;
      const extImg = ['jpg', 'png', 'jpeg'];
      if (!extImg.includes(ext)) {
        throw new Error('Only accept extention .jpg, .png, and .jpeg');
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        res.status(400).json({
          error: true,
          message: error.array(),
        });
      } else {
        Products.insertMany(req.body, (err, result) => {
          res.status(201).json({
            error: false,
            message: 'Success to add',
          });
        });
      }
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error.message,
      });
    }
  }
);

routes.use((req, res, next) => {
  res.status(404).send('<h1>page note found</h1>');
});
module.exports = routes;