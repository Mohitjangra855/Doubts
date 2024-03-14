module.exports.isLoggedIn = (req, res, next) => {
    console.log(req)

    if (!req.isAuthenticated()) {
        req.flash("error", "you must be logged in to create listing");
        res.redirect("/login")
    }
  next();
        // res.redirect(req.originalUrl);
 

}