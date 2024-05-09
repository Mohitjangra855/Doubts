const mongoose = require("mongoose");
const Data = require("./data")
const Employee = require("../models/employee");
const { connect } = require("http2");
const mongoStore = require("connect-mongo")
// const dbUrl = "mongodb://localhost:27017/assignment";
const dbUrl = process.env.ATLASDB_URL;

const store = mongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("error", () => {
    console.log("Session Store Error!" + err);
})
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