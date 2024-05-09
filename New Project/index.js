if(process.env.NODE_ENV !="production"){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Session = require("express-session");
const Flash = require("connect-flash");
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user")
const ExpressError = require("./utils/ExpressError")



// routes................................
const userRoute = require("./routes/user")
const employeeRoute = require("./routes/employee")

// database connection.................

const dbUrl = "mongodb://localhost:27017/assignment";

main().then(() => {
    console.log("database connected")
}).catch((err) => {
    console.log(err)
})

async function main() {
    await mongoose.connect(dbUrl);
}

//session........................

const sessionOption = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}
app.use(Session(sessionOption));
app.use(Flash());


// passport.................................
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// .......................
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// ..................

app.listen(port, () => {
    console.log("app is listening......")
})
//flash...............................
app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


app.use("/", userRoute);
app.use("/employee", employeeRoute);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
})
app.use((err, req, res, next) => {
    let { status = 400, message = "page not found.....!" } = err;
    res.status(status).render("error.ejs", { err })
})