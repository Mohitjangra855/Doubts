//REVIEWS MODEL ADD FOR RATINGS,COMMENT AND CREATED_AT
const mongoose=require ("mongoose");
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default:Date.now() //jevha pan new schema bannar tyat lag se koi date pass nahi hue to default time print honar
    },
    author:{
        type: Schema.Types.ObjectId, //authorisathion mhandhe jyane review takla ahe listing var toch tya review la delte karu shakel
        refer: "User", //user la refer karu object id sathi
    }
});
module.exports=mongoose.model("Review",reviewSchema); //Review name cha model tayar karu