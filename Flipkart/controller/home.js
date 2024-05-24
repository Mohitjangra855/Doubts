const Product = require("../models/Product");
const User = require("../models/user.js");

//Search And Home Page...................
module.exports.homePageRender =

    module.exports.homePageRender = async (req, res) => {
        let { search } = req.query;
        let allProduct = await Product.find();
        let searched = search
            ? allProduct.filter((items) => items.category.toLowerCase() === search.toLowerCase())
            : allProduct;
        if (!searched) {
            req.flash("error", "product not find!")
            return res.redirect("/flipkart")
        }
        res.render("pages/home.ejs", { data: searched });

    }

// New Product Page Render..........
module.exports.newProductPageRender = (req, res) => {
    res.render("pages/new.ejs")
}

// New Product Adding.............
module.exports.newProduct = async (req, res) => {
    const { details } = req.body.item;
    console.log("Original details:", details);
    const descs = details.split(",").map(desc => desc.trim());
    const newProduct = new Product({
        ...req.body.item,
        details: descs
    });
    newProduct.seller = req.user._id;
    await newProduct.save();
    req.flash("success", "Product Successfully Added.")
    res.redirect("/flipkart");
}

// Show Product Page Render...............
module.exports.showProduct = async (req, res) => {
    let { mainId } = req.params;
    let showProduct = await Product.findById(mainId).populate({
        path: "review",
        populate: {
            path: "author",
        }
    }).populate("seller")
    if (!showProduct) {
        req.flash("error", "Product not found!")
        res.redirect("/")
    }
    res.render("pages/show.ejs", { showProduct })
}

// Edit Product Page Render...........
module.exports.editPageRender = async (req, res) => {
    let { mainId } = req.params
    let editData = await Product.findById(mainId);
    res.render("pages/edit.ejs", { editData })
}

// Edit Product Save...............
module.exports.editProduct = async (req, res) => {
    let { mainId } = req.params
    let details = req.body.item.details;
    const descs = details.split(",").map(desc => desc.trim()); // Splitting by comma and trimming whitespace
    let editData = await Product.findByIdAndUpdate(mainId, {
        ...req.body.item,
        details: descs
    });
    req.flash("success", "Item successfully updated")
    res.redirect(`/flipkart/${editData.name}/${editData._id}`)
}

// Delete Product......................
module.exports.deleteProduct = async (req, res) => {
    let { mainId } = req.params
    let deleteData = await Product.findByIdAndDelete(mainId);
    req.flash("success", "Product successfully delete")
    res.redirect("/flipkart")
}

// CART

// Show Product In Cart Page Render ........
module.exports.showCart = async (req, res) => {
    if (req.user) {
        let { _id } = req.user;
        let user = await User.findById(_id).populate("addCart")
        res.render("pages/cart.ejs", { user })
    }
    else {
        req.flash("error", "First you Login your account");
        res.redirect("/login");
    }
}

// Adding Products In Cart..........
module.exports.addCart = async (req, res) => {
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
}

// Remove Prodcut In Cart.........
module.exports.removeCart = async (req, res) => {
    let { productId } = req.params;
    let { _id } = req.user;
    await User.findByIdAndUpdate(_id, { $pull: { addCart: productId } });
    req.flash("success", "Item Successfully removed from Cart")
    res.redirect("/flipkart/cart")
}
