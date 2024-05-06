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

}))
// new item...................
router.get("/new", (req, res) => {
    res.render("pages/new.ejs")
})
// router.post("/", wrapAsync(async (req, res) => {
//     const newProduct = new Product(req.body.item);
//     newProduct.seller = req.user._id;
//     const { details } = req.body;;
//     let array = details.split(","); // Split the string at commas
//     newProduct.details = array
//     await newProduct.save();
//     res.redirect("/flipkart")
// }))

router.post("/", wrapAsync(async (req, res) => {
    const {details} = req.body.item;//suppose item[details] name se aapne field create ki hai
    let descs = details.split(",")
        const newProduct = new Product(req.body.item);
      newProduct.descs = descs; //newProduct.descs is array of all description in Product model
        newProduct.seller = req.user._id;
        await newProduct.save();
        console.log(newProduct);
        res.redirect("/flipkart")
    }))


//Show deatils.............................
router.get("/:name/:mainId", wrapAsync(async (req, res) => {
    let { mainId } = req.params;
    let showProduct = await Product.findById(mainId).populate("seller")
    if (!showProduct) {
        req.flash("error", "Product not found!")
        res.redirect("/")
    }
    console.log(showProduct)
    res.render("pages/show.ejs", { showProduct })

}))

//edit product..................................
router.get("/:name/:mainId/edit", wrapAsync(async (req, res) => {
    let { mainId } = req.params
    let editData = await Product.findById(mainId);
    res.render("pages/edit.ejs", { editData })

}))

router.put("/:name/:mainId", wrapAsync(async (req, res) => {
    let { mainId } = req.params
    let editData = await Product.findByIdAndUpdate(mainId, { ...req.body.item });
    req.flash("success", "Item successfully updated")
    res.redirect(`/flipkart/${editData.name}/${editData._id}`)
}))

//delete product ........................................
router.delete("/:name/:mainId", wrapAsync(async (req, res) => {
    let { mainId } = req.params
    let deleteData = await Product.findByIdAndDelete(mainId);
    req.flash("success", "Product successfully delete")
    res.redirect("/flipkart")
}))








//-----------------------------------------------------------------------------------------------
// show product in cart
router.get("/cart", isLoggedIn, wrapAsync(async (req, res) => {
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