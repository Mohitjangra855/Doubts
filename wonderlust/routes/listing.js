//EXPRESS ROUTER 
//RESTRUCTURING LISTINGS

const express = require("express");
const router = express.Router(); //express chi router object yenar
const wrapAsync = require("../utils/wrapAsync.js")//wrapAsync file la require kele custoom error handling sathi
const Listing = require("../models/listing.js"); //apan te export kele hote na Listing model la tyala require karu "../models/listing.js" models folder madhe jaun listing.js file madhe export kele hote tyala require kar
//.. double dots means parent directory madhe jat ahe
const {isLoggedIn} = require("../middleware.js") //middleware.js la require kele te user login ahe ki nahi pahile create listings karnyasathi te check karne 
const {isOwner} = require("../middleware.js") //isOwner middleware  la require kele ki user kade permission ahe ka updat vagere karaychi  update,delete,edit sathi use keley 
const {validateListing} = require("../middleware.js") //validateListing middleware la require kele 

const listingController = require("../controllers/listings.js") //controoler folder madhun listings.js la require kele  index pass karnyasathi


const multer = require("multer");//multer package la require kele image file la listing madhe parse karnyasathi
const upload = multer({ dest: "uploads/"});//ya destination var uploads navch ch folder banvun tyat file add karnar

//INDEX ROUTE yat app chi access nahi but router che access ahe mhanun router.get etc as find karnar
router.get("/",wrapAsync(listingController.index))//async and await nahi tyachi jagevar .then function use kela asta tari challe aste controler folder madhun listings.js file madhun index la lihile code readable sathi index navacha callback execute honar "/" var request alyas && listingController cha single function pahije index 
router.post("/",
  isLoggedIn,
  // validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
)


// router.post( , (req,res) => {
//   res.send(req.file)
//  }); //yachane uploaded file jevha apan new listing create karnar tevha updload madhun je image ghenar tar te image backentd la send honar yachane
  
  
  //NEW ROUTE
  router.get("/new", isLoggedIn,listingController.renderNewForm)//yat error yet ahe mhanun te /new ha varti je /listings/:id id samjat ahe te mhanun show route chya varti theu & create route khali karat ahe karan form tar banavla pan to form ja data jo aapn form madhe lihinar to create honyasathi create route khali banavla ahe 
  
  
  
  // SHOW ROUTE
  router.get("/:id",wrapAsync(listingController.showListing));//title var click kelyavar purn detai yenar tya id chi jyachavar click kele ahe  
  

//CREATE ROUTE   
router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.createListing));//wrapAsunc file la attach kele error handling sathi karan server side tun jar kahi wrong information create honar jase ki price number chi jagevar character takli tar error yenar te err kade janar sarvat khali last la error handling route create kelela ahe to something wait wrog msg yenar page var

//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm)); //form serve karun denar

//UPDATE ROUTE
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));;


//DELETE ROUTE
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing)); //id ne delete honar 
//fakt ya phase madhe aapn CRUD operation perform and databse create and api la baghitle model la create kele and connection ko establish kiya and database la initialise kele
  

module.exports = router;