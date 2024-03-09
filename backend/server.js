const app = require('./app');
const dotenv = require('dotenv');
const connectDatabse = require('./configs/database');
const cloudinary = require("cloudinary")
//Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.log(err.message);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);

});

// config
dotenv.config({
    path : "backend/configs/config.env",
});


//connect to db
connectDatabse();
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

const server = app.listen( process.env.PORT,()=>{
    console.log(`Server is running on port : http://localhost:${process.env.PORT}`);
})

// unhandleRejections
process.on("unhandledRejection",(err)=>{
    console.log(err.message);
    console.log("Shutting down the server due to unhandled prmoise rejection");
    server.close(()=>{
        process.exit(1);
    });
});
