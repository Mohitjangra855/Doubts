if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Data = require("./data")


// const dbUrl = 'mongodb+srv://mohit:bangbang@cluster0.aq7nqi5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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
    Data.data = Data.data.map((obj) => ({ ...obj, seller: "663897d0560e873bb5496eb5" }))
    await Product.insertMany(Data.data)
    console.log("data uploaded succesfully")
}

insertData();