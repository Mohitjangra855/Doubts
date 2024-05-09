const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    name: {
        type: String

    },
    email: {
        type: String
    },
    number: {
        type: Number
    },
    designation: {
        type: String
    },
    gender: {
        type: String
    },
    course: {
        type: String
    },
    image: {
        type: String,
        default: "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg",
        set: (v) => v === "" ? "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg" : v

    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;