const Joi = require('joi');

const carSchema = Joi.object({
  car: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    Image: Joi.string().allow("", null),
    hp: Joi.number().min(50).required(),
    speed: Joi.number().required(),
    price: Joi.number().min(0).required()

  }).required()
})
const reviewSchema = Joi.object({
  review: Joi.object({
    rate: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),

  }).required()
})

module.exports = {carSchema, reviewSchema};