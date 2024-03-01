const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Garage = require("./models/schema.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync.js");
const { carSchema } = require("./schema.js");

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

main()
    .then(() => {
        console.log("successful working")
    })
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/account');

}
const carValidate = (req, res, next) => {
    let { error } = carSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(500, errMsg)
    } else {
        next()
    }
}
app.listen(port, () => {
    console.log("App is listening..")
})
// Root Route.......................
app.get("/", async (req, res) => {

    res.render("page/root.ejs")
})
// Home Route......................
app.get("/home", wrapAsync(async (req, res) => {
    let garageData = await Garage.find();

    res.render("page/home.ejs", { garageData });
}))
// New Route......................
app.get("/home/new", (req, res) => {
    res.render("page/new.ejs")
})
app.post("/home", carValidate, wrapAsync(async (req, res, next) => {

    let newCar = new Garage(req.body.car);
    await newCar.save();
    console.log(newCar);
    res.redirect("/home")

}))



// Show Route......................
app.get("/home/:id/show", wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id).populate("reviews");

    res.render("page/show.ejs", { garageData });
}))
// Edit Route .....................

app.get("/home/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id)
    res.render("page/edit.ejs", { garageData });
}))
app.put("/home/:id", carValidate, async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndUpdate(id, { ...req.body.car })
    res.redirect(`/home/${id}/show`);
})
// Delete Route .....................
app.delete("/home/:id", wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndDelete({ _id: id })
    res.redirect("/home");
}))

// adding review

app.post("/home/:id/show/review", async (req, res) => {
    let { id } = req.params;
    let garageData = await Garage.findById(req.params.id);
    let newReview = new Review(req.body.review);
    garageData.reviews.push(newReview);
    await newReview.save();
    await garageData.save();
    console.log("new review saved.");
    res.redirect(`/home/${id}/show`);
})
//delete review

app.get("/home/:id/show/review/:rid", async (req, res) => {
    let { id, rid } = req.params;
    let garageData = await Garage.findByIdAndUpdate(id, { $pull: { reviews: rid } })
    let reviewData = await Review.findByIdAndDelete(rid);
    console.log(garageData)
    console.log(reviewData)
    res.redirect(`/home/${id}/show`);

})

// Error Handler ................

app.all("*", (req, res, next) => {

    next(new ExpressError(404, "PAGE NOT FOUND !"));
})

app.use((err, req, res, next) => {
    let { status = 404, message = "page not found" } = err;
    res.status(status).render("error.ejs", { err })

})