const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/db');
const colors = require('colors');
//Middlewares
const errorHandler = require('./middlewares/error')



//Load Env files
dotEnv.config({
    path: './config/config.env',
});
//IMPORT ROUTE FILES
const bootcamps = require('./Routs/bootcamps_router');
//connect to DB
connectDb();
//init app
const app = express();
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Mount Routers here
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler)
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//Handlinhg unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //Close server and exit process
    server.close(() => process.exit(1));
});