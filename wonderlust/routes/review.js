//review la reestucring karu basocaly restructuring means sarve capsule form madhe code yene alag alag file madhe understand sathi
//and app.js madhe major work honar mothe mothe jase database call karne,error handling etc


const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")//wrapAsync file la require kele custoom error handling sathi
const ExpressError = require("../utils/ExpressError.js")//ExpressError file la require kele 
// const listings=require("../routes/listing.js") //listing.js la require kele
const Reviews = require("../models/review.js"); //routes chya folder madhun review.js file  la review la require kele
const Listing = require("../models/listing.js");
const {validateReview} = require("../middleware.js") //middleware.js madhun validateReview la require kele
const {isLoggedIn} = require("../middleware.js") //isLogged in middleware la require kele ki te user logged in ahe ki nahi check karne
const {isReviewAuthor} = require ("../middleware.js") //isReviewAuthor la require kele middleware tun te check karnyasathi ki jayane he review create kele ahe listing madhe toch tyala delte and edit karu shakto 

const reviewController = require("../controllers/reviews.js") //review.js controller tun require kele te async vagere callback shift sathi

//REVIEWS ROUTE MADHE POST ROUTE CREATE KARAT AHOT
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview)); //client side tun pan review add karu shakto and hopscotch varun server side varun pan new review add karu shakta
 

 //REVIEWS DELETE ROUTE
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))
 
 module.exports = router;

 //he saeve /,/:id yachat sarve he child route ahe parent route app.js madhe ahe parent madhe id parameter la merge karna chahte he child ke sath to merge param use karu shakta 4 no chi line var lihile ahr mergeparams:true 