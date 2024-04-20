const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Product = require("./models/Product");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");

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
// search and home page.....................
app.get("/", wrapAsync(async (req, res) => {
    let { search } = req.query;
    let allProduct = await Product.find();
    let searched = search
        ? allProduct.filter((items) => items.company.toLowerCase() === search.toLowerCase())
        : allProduct;
    res.render("pages/home.ejs", { data: searched });
    console.log(searched)

}))
//Show deatils.............................
app.get("/:id/:mainId",wrapAsync(async (req, res) => {
    let { mainId } = req.params;
    let showProduct = await Product.findById(mainId)
    res.render("pages/show.ejs", { showProduct })
    console.log(showProduct)

}))
// login........................................
app.get("/login",(req,res)=>{
    res.send("working signup");
})
// signup.....................................
app.get("/signup",(req,res)=>{
    res.render("pages/signup.ejs");
})



app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
})
app.use((err, req, res,next) => {
    let { status=400, message="page not found.....!" } = err;
 res.status(status).render("pages/error.ejs", { err })
})