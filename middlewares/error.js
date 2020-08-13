const ErrorResponse = require('../utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    let error = {
            ...err
        }
        // console.log(err);
    error.message = err.message;
    //Mongoose bad object ID 
    if (err.name === 'CastError') {
        const message = `Resourse not found with an ID ${err.value}`;
        error = new ErrorResponse(message, 404);

    }
    //Mongoose duplicate key
    if (err.code === 11000) {
        const message = `The item with the key "${error.keyValue.name}" alredy exist`;
        error = new ErrorResponse(message, 400)
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message, 400)
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || `Server Error`
    })
}