const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const Listing = require("./models/listing.js");
const ejsMate =require("ejs-mate");
const methodOverride = require('method-override')
app.engine("ejs",ejsMate);
app.use(express.json());
app.use(methodOverride("_method"));
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

// main root.....................
app.get("/", (req, res) => {
    res.send("hi, i am root")

})
// index root.....................
app.get("/listing", async (req, res) => {
    const alllistings = await Listing.find();
    res.render("listing/index.ejs", { alllistings });

})


// new root.....................

app.get("/listing/new", (req, res) => {

    res.render("listing/new.ejs");
})

app.post("/listing", async (req, res) => {

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    console.log("added data");

})


// show root.....................
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    const alllistings = await Listing.findById(id);

    res.render("listing/show.ejs", { alllistings })

})
// Edit root.....................
app.get("/listing/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing })

})
// update route.....................
app.put("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);

})








// Delete root.....................



app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;

let deleteListing=await Listing.findByIdAndDelete(id);
    res.redirect("/listing")
    console.log(deleteListing);

})







// app.get("/testListing", async (req, res) => {

//     let sampleListing = new Listing({
//         title: "my new Car",
//         description: "car in the night",
//         price: 2200,
//         location: "Mojana",
//         coutry: "India"
// });

//     await sampleListing.save();
//     console.log("Data was saved");
//     res.send("Successful");

// })