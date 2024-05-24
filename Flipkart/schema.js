const Joi = require("joi");

const productSchema = Joi.object({
    item: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.string().required(),
        company: Joi.string().required(),
        details: Joi.string().required(),
        category: Joi.string().required(),
    }).required(),
})

const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required(),
    }).required(),
})
module.exports = { productSchema, reviewSchema }