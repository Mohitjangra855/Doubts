const express = require("express");
const Route = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js")
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

let validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);

    } else {
        next();
    }
}

// Review
//Create  Reviews Route.....

Route.post("/", validateReview, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved.");
    console.log(newReview);
    console.log(listing);
    res.redirect(`/listing/${id}`);
}))


// Delete  Reviews Route.....
Route.get("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    let a = await Review.findByIdAndDelete(reviewId);
    console.log(a);
    res.redirect(`/listing/${id}`)

}))

module.exports = Route;