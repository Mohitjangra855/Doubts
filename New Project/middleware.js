const ExpressError = require("./utils/ExpressError.js")

const { userSchema, employeeSchema } = require("./schema")

// login checking to create new listing
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // redirectURL save
        req.session.redirectUrl = req.originalUrl;
        console.log(req.isAuthenticated());
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
// validation........................................
module.exports.validateEmployee = (req, res, next) => {
    let { error } = employeeSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        console.log(errMsg);
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);

    } else {
        next();
    }
}
