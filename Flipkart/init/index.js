if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Data = require("./data")
const mongoStore = require("connect-mongo")

const dbUrl = process.env.ATLASDB_URL;


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

const store = mongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});
store.on("error",()=>{
    console.log("Session Store Error!"+ err);
})

async function insertData() {
     Product.deleteMany({}).then(()=>{
        console.log("old data deleted");
    })
  Product.insertMany(Data.data).then(()=>{
        console.log("new data inserted");
    })

}
insertData();