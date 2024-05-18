const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    details:
        [
            {
                type: String,
                required: true

            },
        ],
    category: {
        type: String,
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;