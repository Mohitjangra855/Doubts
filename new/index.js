const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js")
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync");
const { listingSchema, reviewSchema } = require("./schema.js");


app.engine("ejs", ejsMate);
app.use(express.json());
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => {
        console.log("connection is successful");
    })
    .catch(() => {
        console.log("connection is not working");
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/newpro");
}

let listingValidation = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

let reviewValidation = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

app.listen(port, () => {
    console.log("app is listening");
})
// home route
app.get("/", wrapAsync(async (req, res) => {
    let data = await Listing.find({});
    res.render("pages/home.ejs", { data })
}))

// new route
app.get("/new", async (req, res) => {
    console.log("new route")
    res.render("pages/new.ejs")
})
app.post("/", listingValidation, wrapAsync(async (req, res) => {
    let data = await Listing({ ...req.body.listing })
    await data.save();
    res.redirect("/")
}))

// Show route
app.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id).populate("review");
    res.render("pages/show.ejs", { data })
}))


// edit route
app.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
    res.render("pages/edit.ejs", { data })
}))


// update route.....................
app.put("/:id", listingValidation, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let a = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    console.log(id)
    console.log(a)
    res.redirect(`/${id}`);

}))

// Delete route

app.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findByIdAndDelete(id).populate("review");
    let deleteListing = await Listing.findByIdAndDelete(id);
    if (listing) {
        let reviews = listing.review;
        for (reviewData of reviews) {
            let a = await Review.findByIdAndDelete(reviewData._id);
            console.log(a);
        }
    }

    res.redirect("/")
}))
// review add
app.post("/:id/review", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const data = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    data.review.push(newReview);
    await newReview.save();
    await data.save();
    console.log("data entered")
    res.redirect(`/${id}`)
}))
// delete review

app.delete("/:id/review/:rid", wrapAsync(async (req, res) => {
    let { id, rid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { review: rid } });
    await Review.findByIdAndDelete(rid);

    res.redirect(`/${id}`)

}))

app.get("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"))
})
app.use((err, req, res, next) => {
    let { status, message } = err;
    res.render("pages/error.ejs", { message })
})