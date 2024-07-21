//PASSPORT 
const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose") //passport-local-monggose la requie kele pahile package download kelta

const userSchema=new Schema ({
    email:{
        type: String,
        required:true,
    },    
});
userSchema.plugin(passportLocalMongoose); //passportLocalMongoose la plugin kela npm package madhe bghne usage la tithe asel ha code passport local mogoose pugging use kele karan te automatic usernsme,hashing,salting and hash password in sabko automatic implemetn karta he

module.exports=mongoose.model("User",userSchema);