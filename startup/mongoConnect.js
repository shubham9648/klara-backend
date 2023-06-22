const mongoose = require("mongoose");
const mongoConfig = require("../config/mongo");
const { logger } = require("../util/logger");

// https://www.linkedin.com/dashboard/
module.exports.connect = () => {
  return new Promise((resolve, reject) => {
    let mongoUrl = process.env.NODE_ENV == "production" ? mongoConfig.mongoUrlProd : mongoConfig.mongoUrl;
    mongoose
      .connect(mongoUrl, mongoConfig.mongoOptions.options)
      .then((connection) => {
        logger.info(`Mongo connected`);
        return resolve(connection);
      })
      .catch((err) => {
        return reject(err);
      });
    mongoose.connection.on("error", (err) => {
      logger.error(`Error in mongoose conection - ${err.message}`);
    });
  });
};

module.exports.close = () => {
  return mongoose.disconnect();
};
