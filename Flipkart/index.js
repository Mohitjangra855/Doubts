const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require("path");
const port = 8080;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const Session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

////////////////////////Routes//////////////////////////

const productRoutes = require("./routes/home");
const userRoutes = require("./routes/user");

////////////////////////Pages///////////////////////////

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/////////////////////////Sessions////////////////////////

let sessionOption = {
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
}
app.use(Session(sessionOption))
app.use(flash())
/////////////////////////Passport////////////////////////

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(() => {
    console.log("............connected with database...............");
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Flipkart');
}

app.listen(port, () => {
    console.log("-------------------------------------------")
})

app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email: "new@gmail.com",
        username: "hello"
    })
    let newUser = await User.register(fakeUser, "hello");
    res.send(`${newUser}`)
})

app.use("/flipkart/", productRoutes)
app.use("/", userRoutes)


app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found!"));
})
app.use((err, req, res, next) => {
    let { status = 400, message = "page not found.....!" } = err;
    res.status(status).render("pages/error.ejs", { err })
})