const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// import routes and db
const routes = require('./routes/routes');
require('./config/db');

// config cors in express
routes.use(cors());

// use routes
// give public access for folder image upload
app.use('/uploads', express.static('uploads'));
app.use(routes);

app.listen(port, () => console.log(`http://localhost:${port} is running`));
