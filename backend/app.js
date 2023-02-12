const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importing routes
const product = require('./routes/productRoutes');
const user = require('./routes/userRoutes');
const order = require("./routes/orderRoutes");

app.use('/api/v1', product);
app.use("/api/v1", user);
app.use("/api/v1", order);

module.exports = app;