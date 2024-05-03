if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Data = require("./data")


// const dbUrl = 'enter your atlas mongodb url and run to insitilized this data in your online mongodb then you run main index.js of flipkart project when you find data.....

const dbUrl = 'mongodb://127.0.0.1:27017/Flipkart';
main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

const insertData = async () => {
    await Product.deleteMany({})
    await Product.insertMany(Data.data)
    console.log("data uploaded succesfully")
}

insertData();
