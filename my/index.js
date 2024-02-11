const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Garage = require("./models/schema.js");
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
app.listen(port, () => {
    console.log("App is listing..")
})
// Root Route.......................
app.get("/", async(req, res) => {
   
    res.render("page/root.ejs")
})
// Home Route......................
app.get("/home", async (req, res) => {
    let garageData = await Garage.find();

    res.render("page/home.ejs", { garageData });
})
// New Route......................
app.get("/home/new", (req, res) => {
    res.render("page/new.ejs")
})
app.post("/home", async (req, res) => {
    let newCar = new Garage(req.body.car);
    await newCar.save();
    console.log(newCar);
    res.redirect("/home")
})



// Show Route......................
app.get("/home/:id/show", async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id)

    res.render("page/show.ejs", { garageData });
})
// Edit Route .....................

app.get("/home/:id/edit", async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findById(id)
    res.render("page/edit.ejs", { garageData });
})
app.put("/home/:id", async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndUpdate(id, { ...req.body.car })
    res.redirect("/home");
})
// Delete Route .....................
app.delete("/home/:id", async (req, res) => {
    let { id } = req.params
    let garageData = await Garage.findByIdAndDelete({_id: id})
    res.redirect("/home");
})
// search.........
app.post("/home/show",(req,res)=>{
    let a = req.query;
    console.log(a);
})