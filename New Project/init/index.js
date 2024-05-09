const mongoose = require("mongoose");
const Data = require("./data")
const Employee = require("../models/employee")
const dbUrl = "mongodb://localhost:27017/assignment";

main().then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err)
})
async function main() {
    await mongoose.connect(dbUrl);
}

async function enterData() {
    await Employee.deleteMany({});
    await Employee.insertMany(Data.employee)
    console.log("data was initialized");

}
enterData();