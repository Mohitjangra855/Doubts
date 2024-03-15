const Listing = require("./models/listing.js");

// login checking to create new listing
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the URL so we can redirect back
        req.flash("error", "you must be logged in to create listing");
        res.redirect("/login")
    }
    next();
}
// jis bhi route se login karte hai ushi route par chale jaye ge 
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
// check the owner then give access ..
module.exports.isOwner = async(req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById;
  
    if (listing.owner._id != res.locals.currUser._id) {
        req.flash("error", "your have not permission!")
        return res.redirect(`/listing/${id}`);
    }
    next();
}