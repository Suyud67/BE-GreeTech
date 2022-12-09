const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const cors = require('cors');

const routes = express();
// import Product
const Products = require('../model/products');

// handle form or post method
routes.use(bodyParser.urlencoded({ extended: true }));

// setup cors
routes.use(cors());

// setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const dateUpload = Date.now();
    cb(null, dateUpload + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

// routes handle getAll Plants
routes.get('/products', async (req, res) => {
  try {
    const plants = await Products.find();
    res.status(200).json({
      error: false,
      plants,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

// routes handle get a plant by id
routes.get('/product/detail/:id', async (req, res) => {
  try {
    const plant = await Products.findOne({ _id: req.params.id });
    res.status(200).json({
      error: false,
      plant,
    });
  } catch (err) {
    res.status(404).json({
      error: true,
      message: err.message,
    });
  }
});

// routes handle post request from user
routes.post('/product/add', [upload.single('img_product'), check('noHp_user', 'Please Use Indonesian format for Phone Number').isMobilePhone('id-ID')], async (req, res) => {
  // validation image
  const imgFile = req.file.originalname;
  const imgChunk = imgFile.split('.');
  const extImg = ['jpg', 'png'];
  const [filename, ext] = imgChunk;

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      error: true,
      message: result.errors[0].msg,
    });
  } else if (!extImg.includes(ext)) {
    res.status(400).json({
      error: true,
      message: 'only accept extension jpg and png',
    });
  } else {
    const newPlant = new Products({
      user: req.body.user,
      nm_product: req.body.nm_product,
      desc_product: req.body.desc_product,
      img_product: req.file.path,
      price_product: req.body.price_product || 'Promotion',
      noHp_user: req.body.noHp_user,
    });

    try {
      await newPlant.save();
      res.status(201).json({
        error: false,
        message: 'Created New Plant Successfuly',
      });
    } catch (err) {
      res.status(400).json({
        error: true,
        message: err.message,
      });
    }
  }
});

routes.use('*', (req, res) => {
  res.status(404).json({
    error: true,
    message: 'page not found',
  });
});

module.exports = routes;
