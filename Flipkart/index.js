const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/Product");

//////////////////////////////////////////////////////////
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

main().then(() => {
    console.log("............connected with database...............");
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Flipkart');
}

app.listen(port, () => {
    console.log("-------------------------------------------")
})

app.get("/", async(req, res) => {
    let data = await Product.find();
    res.render("pages/home.ejs",{data})
})  