const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        require: true,
    },
    howAreYou: {
        type: String
    },
    birthdate: {
        type: Date
    },
    address: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: Number
    },
    image: {
        url: {
            type: String,
            default: "https://res.cloudinary.com/dd3px2fki/image/upload/v1718039910/flipkart_project/aubze8wdizll0eq6n40i.jpg",
        },
        filename: {
            type: String,
            default:"UserImage"
        },
    },
    addCart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);