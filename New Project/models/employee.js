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
        url: String,
        filename: String
},
    date: {
        type: Date,
        default: Date.now
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;