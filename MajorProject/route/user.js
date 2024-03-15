const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middelware");

// sign up.................................
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapasync(async (req, res) => {
    try {

        let { email, username, password } = req.body
        let newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }

            req.flash("success", "Welcome to WanderLust")
            res.redirect("/listing")

        })
    } catch (err) {

        // console.log(err.message);
        req.flash("error", err.message);
        res.redirect("/signup")

    }
}))

// login ..............

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",
        { failureRedirect: "/login", failureFlash: true }
    ), async (req, res) => {
        req.flash("success", "Welocme again to Wanderlust")
        let redirectUrl = res.locals.redirectUrl || "/listing";
        res.redirect(redirectUrl)

    });

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "Logged out successfully! See you soon!");
        res.redirect('/listing');
    })
})
module.exports = router;