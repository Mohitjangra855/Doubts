const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const port = 8080;

const ejsMate = require("ejs-mate");
const methodOverride = require('method-override');
// const cookieParser = require("cookie-parser");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./route/listing");
const reviews = require("./route/review");
const session = require("express-session");
const flash = require("connect-flash")

app.engine("ejs", ejsMate);
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const sessionOption = {
    secret: 'fsdhgkjhgsdkljgh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOption));
app.use(flash());

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
    res.send("go to /listing")
})

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.deleteMsg = req.flash("delete");
    next();
})

app.use("/listing", listings);
app.use("/listing/:id/reviews", reviews)

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Exists..!"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "something went worng" } = err;
    // res.status(status).send(message);
    res.render("error.ejs", { message })
})









