const db = require('mongoose');
require('dotenv').config();

// make a connection to db
db.connect(process.env.DB_PRODUCTS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('success connected to Mongodb'))
  .catch((err) => console.log(err));
