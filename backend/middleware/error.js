/**
 * Directory: backend/middleware/
 * Description: Global error handling middleware to catch and format errors.
 */
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
};

module.exports = errorMiddleware;