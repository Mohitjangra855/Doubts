const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");



// routes.............

router.get("/signup", async (req, res) => {

    res.render("user/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const userData = new User({
            email: email,
            username: username
        })
        const registerUser = await User.register(userData, password);

        req.flash("success", "Welcome to WanderLust")
        res.redirect("/home")

    } catch (err) {

        // console.log(err.message);
        req.flash("error", err.message);
        res.redirect("/signup")

    }


}))
router.get("/login", (req, res) => {
    res.render("user/login.ejs");
})
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust")
        res.redirect("/home")
    })
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        res.redirect("/login");
    })
})
module.exports = router;