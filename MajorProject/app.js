const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
const wrapAsync = require("./utils/wrapasync");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema, listingSchema } = require("./schema.js")
const Review = require("./models/review.js");
const { wrap } = require("module");
const wrapasync = require("./utils/wrapasync");

app.engine("ejs", ejsMate);
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
let validateSchema = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",")
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

let validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    // console.log(error);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);

    } else {
        next();
    }
}

// main root.....................
app.get("/", (req, res) => {
    res.redirect("/listing")

})
// index root.....................
app.get("/listing", wrapAsync(async (req, res) => {
    const alllistings = await Listing.find();
    res.render("listing/index.ejs", { alllistings });

})
)

// new root.....................

app.get("/listing/new", (req, res) => {

    res.render("listing/new.ejs");
})

app.post("/listing", validateSchema, wrapAsync(async (req, res, next) => {

    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listing");
    console.log("added data");

}))


// show root.....................
app.get("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const alllistings = await Listing.findById(id).populate("reviews");

    res.render("listing/show.ejs", { alllistings })

}))
// Edit root.....................
app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    res.render("listing/edit.ejs", { listing })

}))
// update route.....................
app.put("/listing/:id", validateSchema, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listing/${id}`);

}))

// Delete root.....................
app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;

    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listing")
    console.log(deleteListing);

}))

// Review
//Create  Reviews Route.....

app.post("/listing/:id/reviews", validateReview, wrapasync(async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved.");
    // console.log(newReview);
    res.redirect(`/listing/${id}`);
}))

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Exists..!"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "something went worng" } = err;
    // res.status(status).send(message);
    res.render("error.ejs", { message })
})

//Delete  Reviews Route.....

app.delete("/listing/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    // await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}})
    // let a =  await Review.findByIdAndDelete(reviewId);
    console.log(id);
    console.log(reviewId);
    res.redirect("/listing")
}))



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