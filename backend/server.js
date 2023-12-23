const app = require('./app');
const dotenv = require('dotenv');
const connectDatabse = require('./configs/database');


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
