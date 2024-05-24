const Review = require("../models/review");
const Product = require("../models/Product.js");

// Review Added....
module.exports.addReview = async (req, res, next) => {
    let { name, id } = req.params
    const product = await Product.findById(id)
    let newReview = Review(req.body.review);
    newReview.author = req.user;
    product.review.push(newReview);
    await product.save();
    await newReview.save();
    req.flash("success", "Comment successfully added!")
    res.redirect(`/flipkart/${name}/${id}`);
}

// Delete Review....
module.exports.deleteReview = async (req, res) => {
    let { name, id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    let review = await Review.findByIdAndDelete(reviewId)
    console.log(review);
    req.flash("success", ("Comment is deleted"))
    res.redirect(`/flipkart/${name}/${id}`);
}


