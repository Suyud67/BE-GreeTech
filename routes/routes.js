const express = require('express');
const multer = require('multer');
const cors = require('cors');

const routes = express();

// import model db
const Products = require('../model/products');

// config cors in express
routes.use(
  cors({
    origin: '*',
  })
);

// handle form or post method
routes.use(express.urlencoded({ extended: false, limit: '3mb' }));

// set-up multer
const storage = multer.diskStorage({
  // destination file uploaded
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  // add file name
  filename: function (req, file, cb) {
    const dateUpload = Date.now();
    cb(null, dateUpload + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

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
routes.post('/product/add', upload.single('img_product'), async (req, res) => {
  const imgName = req.file.originalname;
  const imgChunk = imgName.split('.');
  const extension = ['jpg', 'png'];
  const [filename, ext] = imgChunk;
  if (!extension.includes(ext)) {
    res.status(400).json({
      error: true,
      message: 'only accept jpg and png ext file',
    });
  } else {
    const plant = new Products({
      user: req.body.user,
      nm_product: req.body.nm_product,
      desc_product: req.body.desc_product,
      img_product: req.file.path,
      price_product: req.body.price_product || '-',
    });
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
