/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 09-08-2021
 */

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");

const index = require("./routes");
const middlewares = require("./middlewares");

const app = express();
app.enable("trust proxy");

app.use(logger("common"));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "unpkg.com", "'unsafe-eval'"],
      "default-src": ["'self'", "unpkg.com"],
    },
  })
);

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected To Database");
  }
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;
