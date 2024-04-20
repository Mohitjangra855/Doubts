const express = require("express");
const passport = require("passport");
const router = express.Router();

// login........................................
router.get("/login", (req, res) => {
    res.render("pages/login.ejs");
})

router.post("/login",  passport.authenticate("local",
{ failureRedirect: "/login", failureFlash: true
}), async (req, res) => {
req.flash("success","Welcome Back to Flipkart");
res.redirect("/flipkart")
})

// signup.....................................
router.get("/signup", (req, res) => {
    res.render("pages/signup.ejs");
})

module.exports = router;