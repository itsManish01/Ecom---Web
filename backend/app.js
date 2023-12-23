const express = require('express');
const app = express();
const errorMiddleware = require('./Middlewares/error');

app.use(express.json());


//routes
const product = require('./routes/productsRouter');
app.use("/api/v1",product);


//middleware for error
app.use(errorMiddleware);

module.exports = app;