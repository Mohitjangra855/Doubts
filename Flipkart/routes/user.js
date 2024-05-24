const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware.js")

// Controller....
const userController = require("../controller/user.js")
// user profile

router.get("/profile", (req, res) => {
    let user = req.user
    res.render("pages/profile.ejs", { user });
})
router.put("/profile/:id", (req, res) => {
    let editUser = req.body.user
    console.log(editUser)
    res.redirect("/profile");
})

// Login Page And Login.....
router.route("/login")
    .get(userController.loginPage)
    .post(saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login", failureFlash: true
        }), userController.Login)

// Signup Page And Signup......
router.route("/signup")
    .get(userController.signupPage)
    .post(wrapAsync(userController.Signup))

// Log out ...............
router.get("/logout", userController.Logout)

module.exports = router;