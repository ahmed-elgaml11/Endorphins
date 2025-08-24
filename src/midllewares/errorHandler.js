
const sendErrorDev = (err, res) => {
    res.status(err.statusCode);
    res.json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    });
}
const sendErrorProd = (err, res) => {
    if (err.isOperational) { // trust the error: send the message
        res.status(err.statusCode);
        res.json({
            status: err.status,
            message: err.message,
        });
    } else {    // programming or unknown error: dont tell the client with the error
        console.error(err)
        res.status(500).json({
            status: 'error',
            message: 'something went very wrong'
        })
    }
}
const errorHandler = (err, req, res, next) => {
    err.statusCode = (err.statusCode && err.statusCode !== 200) ? err.statusCode : 500;
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'production') {
    
        sendErrorProd(err, res)
    }
        
    else if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
};

export default errorHandler;