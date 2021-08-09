/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 08-08-2021
 */

const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Urls", urlSchema);
