const User = require("../models/user");

// Login Page Render...
module.exports.loginPage = (req, res) => {
    res.render("pages/login.ejs");
}

// Login....
module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome Back to Flipkart");
    let redirectURL = res.locals.redirectUrl || "/flipkart"
    res.redirect(redirectURL)
}

// Sign up Page Render......
module.exports.signupPage = (req, res) => {
    res.render("pages/signup.ejs");
}

// Sign up...
module.exports.Signup = async (req, res) => {
    try {
        let { username, email, howAreYou, password } = req.body;
        const user = await User({ username, email, howAreYou });
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Flipkart")
            res.redirect("/flipkart");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}

// Log out ...............
module.exports.Logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully")
        res.redirect("/flipkart")
    })
}
