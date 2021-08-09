/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 09-08-2021
 */
require("dotenv").config();
const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");
const urlsController = require("../controllers/urlsController");

const slowerDown = slowDown({
  windowMs: 30 * 1000,
  delayAfter: 1,
  delayMs: 500,
});
const rateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 3,
});

/* Creating Urls */
router.post("/url", slowerDown, rateLimiter, urlsController.createUrl);

/* Redirect Urls */
router.get("/:id", urlsController.redirectUrl);

module.exports = router;
