/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 09-08-2021
 * @modify date 09-08-2021
 */

require("dotenv").config();
const validateData = require("../validation");
const Url = require("../models/urls");
const { nanoid } = require("nanoid");

const urls = {
  /* Redirect Urls */
  redirectUrl: async (req, res, next) => {
    const { id: slug } = req.params;

    try {
      const url = await Url.findOne({ slug });
      if (url) {
        return res.redirect(url.url);
      }
      next();
    } catch {
      next();
    }
  },
  /* Creating Urls */
  createUrl: async (req, res, next) => {
    let { url, slug } = req.body;

    try {
      const { error } = validateData({
        slug,
        url,
      });
      if (error) {
        return next(error);
      }
      if (url.includes("localhost")) {
        throw new Error("Stop it 🛑");
      }

      if (!slug) {
        slug = nanoid(5);
      } else {
        const existing = await Url.findOne({ slug });
        if (existing) {
          throw new Error("Slug in use. 😢");
        }
      }
      slug = slug.toLowerCase();
      const newUrl = new Url({
        url: url,
        slug: slug,
      });

      await newUrl
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => {
          throw new Error(
            "An Error Occured try again later 😧" + error.message
          );
        });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = urls;
