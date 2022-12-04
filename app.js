const express = require('express');
const app = express();
const port = 5000;

// import routes and db
const routes = require('./routes/routes');
require('./config/db');

// use routes
// give public access for folder image upload
app.use('/uploads', express.static('uploads'));
app.use(routes);

app.listen(port, () => console.log(`http://localhost:${port} is running`));
