const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
// const methodOverride = require("method-override");
const Listing = require("./models/listing.js");

app.use(express.json());
// app.use(express.methodOverride("_method"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Mongoose Connect ..............

main()
    .then(() => {
        console.log("connection is successful");
    })
    .catch(() => {
        console.log("connection is not working");
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


app.listen(port, () => {
    console.log("App is listening...................");
})

app.get("/", (req, res) => {
    res.send("hi, i am root")

})
app.get("/testListing", async (req, res) => {

    let sampleListing = new Listing({
        title: "my new Car",
        description: "car in the night",
        price: 2200,
        location: "Mojana",
        coutry: "India"
});

    await sampleListing.save();
    console.log("Data was saved");
    res.send("Successful");

})