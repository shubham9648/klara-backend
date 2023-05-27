const winston = require("winston");

let transports = [new winston.transports.File({ filename: "error.log", level: "error" }), new winston.transports.File({ filename: "combined.log" })];

if (process.env.ENV !== "production") {
  transports.push(new winston.transports.Console());
}

let logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: transports,
});

module.exports.logger = logger;