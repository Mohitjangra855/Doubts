const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
//controller.........
const userController = require("../controller/user");
// home page........
router.get("/", userController.homePage);

//login............................
router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl,
    passport.authenticate("local",
        { failureRedirect: "/login", failureFlash: true }), wrapAsync(userController.userLogin
        ));

//signup................................
router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.userSignup));

//logout................................
router.get("/logout", userController.userLogout);

module.exports = router;