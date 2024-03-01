const joi = require("joi");
const listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.string().required().min(0),
        image: joi.string().allow("", null)
    }).required(),
})
const reviewSchema = joi.object({
    review: joi.object({
        rate: joi.number().required(),
        comment: joi.string().required()
    }).required(),
})
module.exports = { listingSchema, reviewSchema };