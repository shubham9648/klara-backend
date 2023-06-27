module.exports.responseHandler = (data, res, message, status) => {
    let statusCode = status || 200;
    let messageData = message || `Success`;

    res.status(statusCode).json({
      status: statusCode > 204 ? "error" : "success",
      message: messageData,
      data: data,
    });
  };