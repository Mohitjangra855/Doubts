const Joi = require("joi");
userSchema = Joi.object({
    user: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
}).required(),
})
let employeeSchema = Joi.object({
    employee: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        number: Joi.number().required(),
        designation: Joi.string().required(),
        gender: Joi.string().required(),
        course: Joi.string().required(),
        email: Joi.string().required(),
        image: Joi.string().allow("", null),


    }).required()
})
module.exports= {userSchema , employeeSchema};