if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const mongoose = require("mongoose");
const Product = require("../models/Product");
const Data = require("./data")
const mongoStore = require("connect-mongo")

const dbUrl = process.env.ATLASDB_URL;

// const dbUrl = 'mongodb://127.0.0.1:27017/Flipkart';
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

 const insertData = () =>{
     Product.deleteMany({}).then(()=>{
        console.log("old data deleted");
    })
  Product.insertMany(Data.data).then(()=>{
        console.log("new data inserted");
    })

}
const initDB = async () => {
    await Listing.deleteMany({});
    // initData.data = initData.data.map((obj) => ({ ...obj, owner: "65f144c2e57cd2c28ded4f87" }))
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "66013415dae7efb0da828663" }))
    // initData.data = initData.data.map((obj) => ({ ...obj, geometry: { type: 'Point', coordinates: [ 77.209006, 28.613895 ] },}))
  
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  
insertData();