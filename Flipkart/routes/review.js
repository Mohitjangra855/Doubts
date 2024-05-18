const express = require("express")
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Product = require("../models/Product.js");
const { validateReview } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync.js");

router.post("/", wrapAsync(async (req, res, next) => {
    try {
        let { name, id } = req.params
        const product = await Product.findById(id)
        let newReview = Review(req.body.review);
        newReview.author = req.user ? req.user._id : "6638fe6d8ba4341cb493ea47";
        product.review.push(newReview);
        await product.save();
        await newReview.save();
        req.flash("success", "Comment successfully added!")
        res.redirect(`/flipkart/${name}/${id}`);
    } catch (error) {
        next(error)
    }
}));
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { name, id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    let review = await Review.findByIdAndDelete(reviewId)
    console.log(review);
    req.flash("success", ("Comment is deleted"))
    res.redirect(`/flipkart/${name}/${id}`);

}))

module.exports = router;