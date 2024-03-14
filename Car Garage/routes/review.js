
const express = require("express");
const Route = express.Router({ mergeParams: true });
const Garage = require("../models/schema.js");
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");


const reviewValidate = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(500, errMsg)
    } else {
        next()
    }
}
// adding review

Route.post("/review", reviewValidate, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let garageData = await Garage.findById(req.params.id);
    let newReview = new Review(req.body.review);
    garageData.reviews.push(newReview);
    await newReview.save();
    await garageData.save();
    console.log("new review saved.");
    req.flash("success","Comment successfully added...");
    res.redirect(`/home/${id}/show`);
}))

//delete review

Route.delete("/review/:rid",  wrapAsync(async (req, res) => {
    let { id, rid } = req.params;
    let garageData = await Garage.findByIdAndUpdate(id, { $pull: { reviews: rid } })
    let reviewData = await Review.findByIdAndDelete(rid);
    console.log(garageData)
    console.log(reviewData)
    req.flash("error","Comment Deleted")
    res.redirect(`/home/${id}/show`);

}))

module.exports = Route;