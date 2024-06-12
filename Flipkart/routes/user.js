const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user")
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js")
const multer = require("multer");

// for upload file...........................
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// upload.single('user[image]'),

// Controller....
const userController = require("../controller/user.js");
const { findByIdAndUpdate, findById } = require("../models/Product.js");
// user profile

router.get("/profile", isLoggedIn, async (req, res) => {
    let userid = req.user._id
    let user = await User.findById(userid);
    // console.log(user);
    res.render("pages/profile.ejs", { user });
})
// put req in profile
router.put("/profile/:id", isLoggedIn, upload.single('user[image]'), async (req, res) => {
    let { id } = req.params
    let editUser = await User.findByIdAndUpdate(id, { ...req.body.user });
//     if(req.file != "undefined"){
//         let filename = req.file.filename;
//         let url = req.file.path;
//         editUser.image = { filename, url };
// }
console.log(req.file);
    await editUser.save();
    console.log(editUser);
    req.flash("success", "Your Profile successfully updated.")
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