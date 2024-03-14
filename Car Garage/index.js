const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user");
const { register } = require("module");


const home = require("./routes/home");
const review = require("./routes/review");
const userRotues = require("./routes/user");

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const sessionOption = {
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,

}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



// passport use...................
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main()
    .then(() => {
        console.log("successful working")
    })
    .catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/account');

}

app.listen(port, () => {
    console.log("App is listening..")
})

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success")
    res.locals.errorMsg = req.flash("error");
    next();
})
// Root Route.......................
app.get("/", async (req, res) => {
    res.render("page/root.ejs")
})



// All Routes.......................
app.use("/", userRotues);
app.use("/home", home);
app.use("/home/:id/show", review);


// Error Handler ................

app.all("*", (req, res, next) => {

    next(new ExpressError(404, "PAGE NOT FOUND !"));
})

app.use((err, req, res, next) => {
    let { status = 404, message = "page not found" } = err;
    res.status(status).render("error.ejs", { err })

})