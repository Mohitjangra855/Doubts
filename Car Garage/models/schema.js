const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        type: String
    },
    hp: {
        type: Number
    },
    speed: {
        type: Number
    },
    Image: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4KSlDRh2kyDSq8Z6vHUHC0pyccJnuJxn_6bIjgSQnQ&s",
        set: (v) => v === "" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM4KSlDRh2kyDSq8Z6vHUHC0pyccJnuJxn_6bIjgSQnQ&s" : v
    },
    price: {
        type: Number
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const Garage = new mongoose.model("Garage", dataSchema);

module.exports = Garage;