const mongoose = require("mongoose");
const Product = require("../models/Product");
const Data = require("./data")

const MONGO_URL = 'mongodb://127.0.0.1:27017/Flipkart';

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


async function insertData() {
     Product.deleteMany({}).then(()=>{
        console.log("old data deleted");
    })
  Product.insertMany(Data.data).then(()=>{
        console.log("new data inserted");
    })

}
insertData();