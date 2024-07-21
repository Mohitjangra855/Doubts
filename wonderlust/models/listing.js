// //model manavnar schema cha and export karun deu and usee exported schema ko app.js me use karenge 

// const { mongo } = require("mongoose");

const mongoose=require ("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js"); //revie la require kele

const listingSchema=new Schema({
    title:{
     type:String,
    //  required:true,
    },
    description:String,
    image:{
        // filename:String,   
        // url:{
        // type: String,
        // default:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",//default logic check karnar ki image hi user karun undefined,null asli tar hi link paste karun denar
       // set:(v) => v===" " ? "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,//default image url  paste kele jar user ne tyache photo takle nahi tar te default url set honar apan jo takla ahe to hi condition client sathi set keli ahe user sathi set keli ahe user and client yekch ahe and  jab ham frontend ke sath kam kar rhe honge
        url: String,
        filename: String,
    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId, //perticulat hotel che review chi object id  array madhe store karu
            ref:"Review",// tya object id cha reference Review asnar
        },
    ],
    owner: { //autherigation topic karat aheot
        type: Schema.Types.ObjectId,
        ref: "User", //User la refernece ghetle user.js file madhun he vastu karnyasathi nantar add keli aapna tyamule index.js la reinitialize kru
    }
});//listing schema create kela 


listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({ _id : { $in: listing.reviews }}); //jar tya listening chi id madhe reviews asnar tar te reviews pan delete houn janar
    }
});//mongoose middleware ahe reviews sathi jar purn listings delete honar tar tya listings madhe reviews asel tar te pan delete honarr

const  Listing = mongoose.model("Listing",listingSchema); //model banavla 

module.exports=Listing; //export karu and app.js madhe import karu


