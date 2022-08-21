/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 21-08-2022
 */

require("dotenv").config()
const express = require("express")
const logger = require("morgan")
const helmet = require("helmet")
const path = require("path")
const {
  connect,
  connection
} = require("mongoose")

const index = require("./routes")
const middlewares = require("./helpers/middlewares")

const app = express()
app.enable("trust proxy")

app.use(logger("dev"))
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self' unpkg.com", "unpkg.com", "'unsafe-eval'"],
      "default-src": ["'self'", "unpkg.com"],
    },
  })
)


connect(process.env.MONGODB_URL)

connection.on("connected", () => {
  console.log("🎉 mongoose connected to db")
})

connection.on("error", (err) => {
  console.log("mongoose connection error.", err.message)
})

connection.on("disconnected", () => {
  console.log("mongoose connection is disconnected.")
})


app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.static(path.join(__dirname, "public")))

app.use("/", index)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 4000
const server = app.listen(port, () => {
  console.log(`🚀 server started => listening on PORT: ${port} with processId: ${process.pid}`)
})

process.on("SIGINT", () => {
  console.info("SIGINT signal received.")
  console.log("server is closing.")
  server.close(() => {
    console.log("server closed.")
    connection.close(false, () => {
      process.exit(0)
    })
  })
})

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.")
  console.log("server is closed.")
  server.close(() => {
    console.log("server closed.")
    connection.close(false, () => {
      process.exit(0)
    })
  })
})


module.exports = app