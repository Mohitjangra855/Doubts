const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
    },

})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("Users",userSchema);
module.exports = User;