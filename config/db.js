const db = require('mongoose');

// make a connection to db
db.connect('mongodb://127.0.0.1:27017/project-capstone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('success connected to Mongodb'))
  .catch((err) => console.log(err));
