//FORM IMPLEMENT KARU SIGNUP CHA 
const express = require ("express")
const router = express.Router();
const User = require("../models/user.js"); //user model require kela
const wrapAsync = require("../utils/wrapAsync.js"); //wrapasync automatic require jala jevha router.post madhe wrapasyc use kela tar
const passport = require ("passport"); //passport la require kele
const {saveRedirectUrl} = require ("../middleware.js") //middleare.js la require kele te saveRedirect login sathi 

const userController = require ("../controllers/users.js") //user.js la require kele controller folder madhun

router.get("/signup",(userController.renderSignupForm));

//SIGNUP ROUTE
router.post("/signup",wrapAsync(userController.signup));//signup honar user 


//LOGIN USER

router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local", {failureRedirect: "/login",failureFlash:true}),userController.login); //is tarah se login kam karta he login honar user


// LOGOUT USER  
router.get("/logout",userController.logout) //logout sathi localhost:8080/logout karayche

module.exports = router;