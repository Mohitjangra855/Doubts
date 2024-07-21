//USER LOGIN AHE KI NAHI FIRST CREATE LISTING SATHI NEW,EDIT,UPDATE,DELETE LISTING KARNYASATHI TYAMULE SARVE JAGEVAR IF CONDITION LAU NAHI SHAKTA MHANUN AS A MIDDLEWARE PASS KELE JAST JAGEVAR USE KARAYCHE ASEL YEKCH CONDITION TAR TYALA MIDDLEWARE PASS KARNE 

const Listing = require("./models/listing")//listing model la require kele
const ExpressError = require("./utils/ExpressError.js")//ExpressError file la require kele 
const {listingSchema} = require("./schema.js"); //joi validation kele hote na to schema la require kele  {listingSchema} ha object hota mhanun tyala curly braces madhe takle
const {reviewSchema} = require("./schema.js"); //validate review middleware sathi reviewScema la require kele 
const Review = require("./models/review") //review a require kele isReviewAuthor middlware sathi 

module.exports.isLoggedIn = (req,res,next) =>{ //isLoggedIn function ahe
    if(!req.isAuthenticated()){ //create listings karaychya pahile check karu ki user ne login and signup kele with the help of passport method (re.isAuthenticated()) ne
        req.session.redirectUrl = req.originalUrl ;  //te login jalyavar drirect crete new listings var redirect vhayala pahije user tyasathi redirectUrl variable create kela user.js madhe pan kele ahe as implement
        req.flash("error","you must be looged in to create listing!") //jar user ne login and signup nasel kele tar error flash kara form naka dya
       return res.redirect("/login"); //jar logged in nasel tar login kara pahile 
      }
      next(); //jar user login nahi tar next la call karun login page var redirect karel
}
module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl //local madhe save kele karan te login jalyavr automatic session reset karate passpoet pan passport locals la accessakru shakt anhi mhanun redirectUrl la locals madhe save kele
    }
    next();
}

module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params; //id request chya parameter tun yenar
    let listing = await Listing.findById(id); //listing ko leke ayenge database se  tyasathi pahile listing model require karawa lagel
    if(! listing.owner._id.equals(res.locals.currUser._id)) { // aapan listing autherisation bghat ahot jar tya listing cha owner equals nahi ahe tya listing cha id shi tar tyala update nahi karayche 
    req.flash("error","you are not owner of this listing")
    return res.redirect(`/listings/${id}`); //show route la redirect karu return nahi kele tar khalche operation pan perform honar
    } //ha code sarve thikani vapraycha mhanun middleware create karu yachane je owner asel tya listing che tech edit karu shaknar jar bina owner che te jar edit karayala gelo tar edit honar nahi 
    next() //middleare madhe next la call karaychecj 
}

//validate listening
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body.listing); //req.body tya joi cha schema la satisfy karat ahe all condition te validate karnar
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(","); //ji pan terminal madhe error detail yenar tyacha fakt message yenar and te join honar separat comma , tun
        throw new ExpressError(400,errMsg);//result.error yenar hopscotch var listings add kartana error ala ki joi result cha error show karnar direct hopescotch chya html page var
    }else{
      next();  
    }
};//validate listing la as a middleware pass kele karan ghadi ghadi use karayche mhanun 


//validate Reviews middleware 
module.exports.validateReview =(req,res,next)=>{
    let {error} = reviewSchema.validate(req.body); //req.body tya joi cha schema la satisfy karat ahe all condition te validate karnar
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(","); //ji pan terminal madhe error detail yenar tyacha fakt message yenar and te join honar separat comma , tun
        throw new ExpressError(400,errMsg);//result.error yenar hopscotch var listings add kartana error ala ki joi result cha error show karnar direct hopescotch chya html page var
    }else{
      next();  
    }
};


module.exports.isReviewAuthor = async (req,res,next) => { //basically he middleware check karnar ki jyane to review delete kelela ahe toch tyala delte karu shkto mhanje jo author ah ereview cha toch delete karu shakto
    let {id, reviewId} = req.params; //id request chya parameter tun yenar reviewid yenar req cha parameter madhun || show page la redirect sathi id pan asli pahije extract keleli
    let review = await Review.findById(reviewId); //listing ko leke ayenge database se  tyasathi pahile listing model require karawa lagel
    if(! review.author._id.equals(res.locals.currUser._id)) { // aapan reviews autherisation bghat ahot jar tya review cha author equals nahi ahe tya review cha id shi tar tyala delete & updete  nahi karayche 
    req.flash("error","you are not the author of this review")
    return res.redirect(`/listings/${id}`); //show route la redirect karu return nahi kele tar khalche operation pan perform honar
    } //ha code sarve thikani vapraycha mhanun middleware create karu yachane je owner asel tya listing che tech edit karu shaknar jar bina owner che te jar edit karayala gelo tar edit honar nahi 
    next() //middleare madhe next la call karaychecj 
}
