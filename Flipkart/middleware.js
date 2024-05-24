const Product = require("./models/Product");
// const { productSchema } = require("./schema");
const { reviewSchema, productSchema } = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //----------------- redirectURL save--------------------
        console.log(req.originalUrl)
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in First!");
        return res.redirect("/login");
    }
    next();
};
// jis bhi route se login karte hai ushi route par chale jaye ge 
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// check the owner then give access ..
module.exports.isOwner = async (req, res, next) => {
    let { name, mainId } = req.params;
    console.log(req.params)
    let product = await Product.findById(mainId);
    if (!product.seller._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to proceed with the action !!");
        return res.redirect(`/flipkart/${name}/${mainId}`);
    } 
    next()
};


// validation product schema..............
module.exports.validationProduct = async (req, res, next) => {
    let { error } = productSchema.validate(req.body)
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next()
    }
}
// validation review Schema...................
module.exports.validationReview = async (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg)
    } else {
        next();
    }
}