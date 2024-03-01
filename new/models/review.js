const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MONGO_URL = "mongodb://127.0.0.1:27017/newpro";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const reviewSchema = new Schema({
    rate: Number,
    comment: String

})
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;