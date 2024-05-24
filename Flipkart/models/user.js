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
    addCart: [
        {
            type: Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);