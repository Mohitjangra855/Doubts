const express = require("express");
const Route = express.Router();
const wrapAsync = require("../utils/wrapasync");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema } = require("../schema.js")
const Listing = require("../models/listing.js");


let validateSchema = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// index root.....................
Route.get("/", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find();
    req.flash("success","new listing added...");
    res.render("listing/index.ejs", { alllistings });

})
)

// new root.....................

Route.get("/new", (req, res) => {

    res.render("listing/new.ejs");
})

Route.post("/",validateSchema, wrapAsync(async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    console.log("added data");

}))


// show root.....................
Route.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const alllistings = await Listing.findById(id).populate("reviews");

    res.render("listing/show.ejs", { alllistings })

}))
// Edit root.....................
Route.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing })

}))
// update route.....................
Route.put("/:id", validateSchema, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);

}))

// Delete root.....................

Route.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate('reviews');
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (listing) {
        let reviews = listing.reviews;
        for (let review of reviews) {
            await Review.findByIdAndDelete(review._id);
        }
    }
    req.flash("delete"," listing deleted!");
    res.redirect("/listing");
    console.log(deletedListing);
}));

module.exports = Route;