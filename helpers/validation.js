/**
 * @author YsnIrix
 * @email ysn4irix@gmail.com
 * @create date 08-08-2021
 * @modify date 21-08-2022
 */

const Joi = require("joi")

const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
}

const validateData = (data) => {
  const schema = Joi.object({
    url: Joi.string()
      .trim()
      .uri()
      .required()
      .pattern(
        new RegExp(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
        )
      )
      .error(new Error("A valid URL is required!")),
    slug: Joi.string()
      .trim()
      .pattern(new RegExp(/^[\w\-]+$/i))
      .min(5)
      .error(
        new Error(
          "Slug length must be more than 5 & contains numbers & caracters"
        )
      ),
  })
  return schema.validate(data, options)
}

module.exports = validateData