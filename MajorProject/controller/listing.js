const Listing = require("../models/listing");

// all......................
module.exports.index = async (req, res) => {
    const alllistings = await Listing.find();
    res.render("listing/index.ejs", { alllistings });
}
// new form......
module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

// create.............
module.exports.createListing = async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New listing added...");
    res.redirect("/listing");
    console.log("added data");

}

//Show .....................
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const alllistings = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        }
    }).populate("owner");
    if (!alllistings) {
        req.flash("error", "listing is not exists...");
        res.redirect("/listing")
    }
    res.render("listing/show.ejs", { alllistings })

}

//Edit..................
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing })
}

//update.................
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash("success", "Listing Updated...");
    res.redirect(`/listing/${id}`);

}

//delete.....................
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (listing) {
        let reviews = listing.reviews;
        for (let review of reviews) {
            await Review.findByIdAndDelete(review._id);
        }
    }
    req.flash("delete", " listing deleted!");
    res.redirect("/listing");
}