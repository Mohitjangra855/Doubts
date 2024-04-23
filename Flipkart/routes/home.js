const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Product = require("../models/Product");
const User = require("../models/user.js")
const { isLoggedIn } = require("../middleware");


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
// show product in cart
router.get("/cart",isLoggedIn, wrapAsync(async (req, res) => {
    if (req.user) {
        let { _id } = req.user;
        let user = await User.findById(_id).populate("addCart")
        res.render("pages/cart.ejs", { user })
    }
    else {
        req.flash("error", "First you Login your account");
        res.redirect("/login");
    }
}))
// adding in the cart
router.post("/:name/:mainId", wrapAsync(async (req, res) => {
    let { name, mainId } = req.params;
    if (req.user == undefined) {
        req.flash("error", "Please Login to add Cart")
        res.redirect(`/flipkart/${name}/${mainId}`)
    }
    else {
        let { _id } = req.user;
        let user = await User.findById(_id);
        user.addCart.push(mainId)
        await user.save();
        console.log(user)
        req.flash("success", "item Added in cart")
        res.redirect(`/flipkart/${name}/${mainId}`);
    }

}))
// destroy product in cart
router.delete("/cart/:productId", async (req, res) => {
    let { productId } = req.params;
    let { _id } = req.user;
    let a = await User.findByIdAndUpdate(_id, { $pull: { addCart: productId } });
    console.log(a);
    req.flash("success", "Item Successfully removed from Cart")
    res.redirect("/flipkart/cart")
})

module.exports = router;