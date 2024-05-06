const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user")
const { saveRedirectUrl } = require("../middleware.js")

// login........................................
router.get("/login", (req, res) => {
    res.render("pages/login.ejs");
})

router.post("/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", failureFlash: true
    }), async (req, res) => {
        req.flash("success", "Welcome Back to Flipkart");
        let redirectURL = res.locals.redirectUrl || "/flipkart"
        res.redirect(redirectURL)
    })

// signup.....................................
router.get("/signup", (req, res) => {
    res.render("pages/signup.ejs");
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, howAreYou, password } = req.body;
        
        const user = await User({ username, email, howAreYou });
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Flipkart")
            res.redirect("/flipkart");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")

    }
}))

// Log out ...............

router.get("/logout", (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully")
        res.redirect("/flipkart")
    })
})

module.exports = router;