/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 21-08-2022
 */

const mongoose = require("mongoose")

const urlSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true,
  versionKey: false
})

module.exports = mongoose.model("Urls", urlSchema)