//JOI SERVER SIDE SCHEMA VALIDATION
const Joi = require('joi');


// m      title : Joi.string(), //title asla pahije schema madhe to pan required asla pahije
//   odule.exports.listingSchema=Joi.object({ 
//     listing : Joi.object({ //listing object
//         image:Joi.allow("",null),
//         url: Joi.allow("", null),
//         description : Joi.string().required(),
//         location : Joi.string().required(),
//         country : Joi.string().required(),
//         price : Joi.number().required().min(0), //price chi value negative nahi pahije min 0 pahije and tyacha pude posititve pahije value
//         title : Joi.string().allow("",null), //image required nahi pan empty string and null value allow asel
//     }).required() //ji listing object asel ti required asel
// });

// const Joi = require("joi"); //Requiring joi for craeting a schema for server side validations
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("", null),
        category: Joi.string().required(),
    }).required()
});











//review validation sathi joi cha schema banavla
module.exports.reviewSchema=Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5), //rating chi fix range 1 to 5 range 
        comment:Joi.string().required(),
    }).required() //review navachi object required means te aslich pahije
})


// module.exports.listingSchema=Joi.object({ 
//     listing : Joi.object({ //listing object
//         title : Joi.string(), //title asla pahije schema madhe to pan required asla pahije
//         image:Joi.allow("",null),
//         url: Joi.allow("", null),
//         description : Joi.string().required(),
//         location : Joi.string().required(),
//         country : Joi.string().required(),
//         price : Joi.number().required().min(0), //price chi value negative nahi pahije min 0 pahije and tyacha pude posititve pahije value
//         title : Joi.string().allow("",null), //image required nahi pan empty string and null value allow asel
//     }) //ji listing object asel ti required asel
// }); 
