//File to handle the error output with Express error handler - i.e. remove HTML templaet format

const errorHandler = (err, req, res, next) => { 
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
        //Show stack trace errors only when in development mode else hide when in production
    })
}

module.exports = {
    errorHandler,
}