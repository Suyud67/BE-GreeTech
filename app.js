const express = require('express');
const app = express();
const port = 5000;

// import routes and db
const routes = require('./routes/routes');
require('./config/db');

// use routes
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`http://localhost:${port} is running`));
