const express = require("express");
const Garage = require("../models/schema.js");
const Route = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const { carSchema } = require("../schema.js");
const isLoggedIn = require("../middelware.js");

const carValidate = (req, res, next) => {
    let { error } = carSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(500, errMsg)
    } else {
        next()
    }
}

// Home Route......................
Route.get("/", wrapAsync(async (req, res) => {
    let garageData = await Garage.find();

    res.render("page/home.ejs", { garageData });
}))
// New Route......................
Route.get("/new", isLoggedIn, (req, res) => {


    res.render("page/new.ejs")
})
Route.post("/", carValidate, isLoggedIn, wrapAsync(async (req, res, next) => {
    let newCar = new Garage(req.body.car);
    await newCar.save();
    console.log(newCar);
    req.flash("success", "Successfully added a Car!");
    res.redirect("/home")

}))



// Show Route......................
Route.get("/:id/show", wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id).populate("reviews");
    if (!garageData) {
        req.flash("error", "this page is not exists...");
        res.redirect("/home")
    }
    res.render("page/show.ejs", { garageData });
}))
// Edit Route .....................

Route.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id)
    if (!garageData) {
        req.flash("error", "this page is not exists...");
        res.redirect("/home")
    }
    res.render("page/edit.ejs", { garageData });
}))
Route.put("/:id", isLoggedIn, carValidate, async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndUpdate(id, { ...req.body.car })
    req.flash("success", "Updated Successfully.....");

    res.redirect(`/home/${id}/show`);
})
// Delete Route .....................
Route.delete("/:id", isLoggedIn , wrapAsync(async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndDelete({ _id: id })

    req.flash("success", "Car Data Deleted");

}))

module.exports = Route;