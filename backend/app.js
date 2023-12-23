const express = require('express');
const app = express();
const errorMiddleware = require('./Middlewares/error');
app.use(express.json());


//routes
const product = require('./routes/productsRouter');
const user = require('./routes/userRouter');

app.use("/api/v1",product);
app.use("/api/v1",user);


//middleware for error
app.use(errorMiddleware);

module.exports = app;