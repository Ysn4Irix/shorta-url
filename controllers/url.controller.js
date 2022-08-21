/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 09-08-2021
 * @modify date 21-08-2022
 */

require("dotenv").config()
const validateData = require("../helpers/validation")
const Url = require("../models/url.model")
const {
  nanoid
} = require("nanoid")

const urls = {
  /* Redirect Urls */
  redirectUrl: async (req, res, next) => {
    const {
      id: slug
    } = req.params

    try {
      const url = await Url.findOne({
        slug
      })
      if (url) {
        return res.redirect(url.url)
      }
      next()
    } catch {
      next()
    }
  },
  /* Creating Urls */
  createUrl: async (req, res, next) => {
    let {
      url,
      slug
    } = req.body

    try {
      const {
        error
      } = validateData({
        slug,
        url,
      })
      if (error) {
        return next(error)
      }
      if (url.includes("localhost")) {
        throw new Error("Stop it 🛑")
      }

      if (!slug) {
        slug = nanoid(5)
      } else {
        const existing = await Url.findOne({
          slug
        })
        if (existing) {
          throw new Error("Slug in use. 😢")
        }
      }
      slug = slug.toLowerCase()
      const newUrl = new Url({
        url,
        slug,
      })

      const result = await newUrl.save()
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  },
  getUrls: async (req, res, next) => {
    try {
      const result = await Url.find()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = urls