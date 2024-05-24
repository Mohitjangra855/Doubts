const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, validationProduct, isOwner } = require("../middleware");

// controller
const productController = require("../controller/home");
// 


// Home Page And New Product Create....
router.route("/")   
.get(wrapAsync(productController.homePageRender))
.post(isLoggedIn, validationProduct, wrapAsync(productController.newProduct));

// New Product Page Render..........
router.get("/new", isLoggedIn, productController.newProductPageRender)

// Edit Product Page Render...........
router.get("/:name/:mainId/edit", isLoggedIn, isOwner, wrapAsync(productController.editPageRender))

// Remove Prodcut In Cart.........
router.delete("/cart/:productId", isLoggedIn, productController.removeCart);


// Add Cart Product, Edit Product And Delete Product .........
router.route("/:name/:mainId").get(wrapAsync(productController.showProduct))
    .post(isLoggedIn, wrapAsync(productController.addCart))
    .put(isLoggedIn, isOwner, wrapAsync(productController.editProduct))
    .delete(isLoggedIn, isOwner, wrapAsync(productController.deleteProduct))

// Show Product In Cart Page Render ........
router.get("/cart", isLoggedIn, wrapAsync(productController.showCart));


module.exports = router;