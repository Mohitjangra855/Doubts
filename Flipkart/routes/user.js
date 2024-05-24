const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware.js")
const multer = require("multer");

// for upload file...........................
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// upload.single('user[image]'),

// Controller....
const userController = require("../controller/user.js");
const { findByIdAndUpdate } = require("../models/Product.js");
// user profile

router.get("/profile", (req, res) => {
    let user = req.user
    res.render("pages/profile.ejs", { user });
})
router.put("/profile/:id",upload.single('user[image]'), async (req, res) => {
    let { id } = req.params
    let editUser = await findByIdAndUpdate(id, { ...req.body.user });
    let filename = req.file.filename;
    let url = req.file.url;
    console.log(req.file);
    editUser.image = { filename, url };
    await editUser.save();
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