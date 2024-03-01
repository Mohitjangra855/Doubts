const Joi = require('joi');

module.exports.carSchema = Joi.object({
 car : Joi.object({
   name: Joi.string().min(3).max(30).required(),
   Image: Joi.string().allow("",null),
    hp: Joi.number().min(50).required(),
    speed: Joi.number().required(),
    price: Joi.number().min(0).required()
   
}).required()
})