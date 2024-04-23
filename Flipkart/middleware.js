module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // redirectURL save
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