const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: String,
    description: String,
    image: {
        type : String,
        default: "https://unsplash.com/photos/photo-of-mountain-ruWkmt3nU58",
        required: true,
        set: (v) => v === "" ? "https://unsplash.com/photos/photo-of-mountain-ruWkmt3nU58" : v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model('Listing', listingSchema);
// module.exports = Listing;
