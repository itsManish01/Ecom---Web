const express = require('express');
const app = express();
const errorMiddleware = require('./Middlewares/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(express.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload()); 
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