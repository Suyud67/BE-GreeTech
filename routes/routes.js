const express = require('express');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const routes = express();

// import model db
const Products = require('../model/products');

// handle form or post method
routes.use(express.urlencoded({ extended: false, limit: '5mb' }));

// config cors in express
routes.use(cors());

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
routes.get('/product/detail/:id', async (req, res) => {
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
routes.get('/product/add', (req, res) => {
  res.render('form');
});

routes.post('/product/add', async (req, res) => {
  const imgPlant = req.body.img_product;
  const imgChunk = imgPlant.split('.');
  const extImg = ['jpg', 'png', 'jpeg'];
  [valueImg, ext] = imgChunk;

  if (!extImg.includes(ext)) {
    res.status(400).json({
      error: true,
      message: 'Only accept extention .jpg, .png, and .jpeg',
    });
    return false;
  }

  const plant = new Products(req.body);
  try {
    await plant.save();
    res.status(201).json({
      error: false,
      message: 'Success to add plant',
    });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: error.message,
    });
  }
});

routes.use((req, res, next) => {
  res.status(404).send(
    `<h1>page note found</h1>
      <ul>
        <li>/products</li>
      </ul>
    `
  );
});
module.exports = routes;
