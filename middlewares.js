/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 08-08-2021
 */

const path = require("path");
const notFoundPath = path.join(__dirname, "public/404.html");

const notFound = (req, res, next) => {
  /* const error = new Error(`Request Not Found - ${req.originalUrl}`); */
  /* res.status(404); */
  return res.status(404).sendFile(notFoundPath);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🙄🙄" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
