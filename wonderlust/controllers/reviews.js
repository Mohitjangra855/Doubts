// MVC: CONTROLLER IMPLEMENT DESIGN PATTERN FOR REVIEWS 

const Listing = require("../models/listing")//listing model require kele 
const Reviews = require ("../models/review") //review model la require kele model folder madhun

module.exports.createReview = async(req,res)=>{ //validateReview la as a middleware pass kele and error handling sathi wrapasync pass kele basic error handling sathi
    let listing = await Listing.findById(req.params.id) //listing find out karnar pahile param means parameter 
     let newReview = new Reviews(req.body.review);//request chi body madhe je review ale hote te yenar
        newReview.author = req.user._id //jar new review backend hopescoth varun yeta review takayla tar jo user login ahe to user chi author store honar reviews amdhe 
    // console.log(newReview); //new review add karnar kontya pan listing var tar tya review cha author rating comment sarve print hoil terminal madhe
     listing.reviews.push(newReview);//apan listings madhe reviews cha array banavla hota tyat push karu 
 
    await  newReview.save();
    await listing.save();
    // console.log(req.body.review)
    req.flash("success"," new review created")//listing cha review save jalya nantar review was created cha flash honar messge 
    res.redirect(`/listings/${listing._id}`);
 }

 module.exports.deleteReview = async (req,res)=>{
    let {id, reviewId} =req.params;
     await Listing.findByIdAndUpdate(id,{$pull:{ reviews: reviewId}}) //aplyala reviews array tun reviewId la delet ekarayche mhanun mongo madhe  special $ pull operator bghu mhanje {$pull{reviews:reviewID}} reviews array madhe jaun ti review id jayaca review ne match jali tar ti delete karnar
    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success"," review deleted")//listing cha review la delete  jalya nantar review was deletedd cha flash honar messge 
    res.redirect(`/listings/${id}`);
}