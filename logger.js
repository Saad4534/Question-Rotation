/* eslint-disable import/no-extraneous-dependencies */
const winston = require("winston");
const config = require("config");
require("express-async-errors");

const uncaughtExceptionsLogFile = "uncaughtExceptions.log";
const logFile = "logfile.log";

const logFormat = winston.format.printf(
  ({ level, message, timestamp }) =>
    `[${timestamp}] [${level}]] ${message}`
);

const logger = winston.createLogger({
  level: config.get("log_level"),
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [new winston.transports.File({ filename: logFile })],
  exceptionHandlers: [
    new winston.transports.File({ filename: uncaughtExceptionsLogFile }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: uncaughtExceptionsLogFile }),
  ],
});

process.on("unhandledRejection", (ex) => {
  throw ex;
});

module.exports = logger;
