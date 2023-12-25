const express = require('express');
const app = express();
const errorMiddleware = require('./Middlewares/error');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

//routes
const product = require('./routes/productsRouter');
const user = require('./routes/userRouter');
const order = require('./routes/orderRouter');

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);


//middleware for error
app.use(errorMiddleware);

module.exports = app;