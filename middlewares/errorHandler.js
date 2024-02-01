import HttpError from "../models/errorModel.js";

  const notFound = (req, res, next) => {
    const error = new HttpError(` Not Found - ${req.originalUrl} ` , 404);
    next(error);
  };
  
  const errorHandler = (err, req, res, next) => {

    let statusCode = err.code === 200 ? 500 : err.code;
    let message = err.message;

   
    res.status(statusCode || 500).json({
      message: message, 
      stack: err.stack,
    });
  };
  
  export { notFound, errorHandler };