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
            default: "https://asset.cloudinary.com/dd3px2fki/c5daf5b32a1ae1dd301b7215395827e2"
        },
        filename: {
            type: String,
            default: "userDefault_pic"
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