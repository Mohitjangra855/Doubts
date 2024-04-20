const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../models/Product");


// search and home page.....................
router.get("/", wrapAsync(async (req, res) => {
    let { search } = req.query;
    let allProduct = await Product.find();
    let searched = search
        ? allProduct.filter((items) => items.company.toLowerCase() === search.toLowerCase())
        : allProduct;
    if (searched.length == 0) {
        req.flash("error", "product not find!")
        res.redirect("/flipkart")
    }
    res.render("pages/home.ejs", { data: searched });
    // console.log(searched)

}))
//Show deatils.............................
router.get("/:name/:mainId", wrapAsync(async (req, res) => {
    let { mainId } = req.params;
    let showProduct = await Product.findById(mainId)
    if (!showProduct) {
        req.flash("error", "Product not found!")
        res.redirect("/")
    }
    res.render("pages/show.ejs", { showProduct })
    // console.log(showProduct)

}))

module.exports = router;