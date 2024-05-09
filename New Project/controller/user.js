const User = require("../models/user")

//home page...............
module.exports.homePage = (req, res) => {
    res.render("page/home.ejs")
}

// login page render.........
module.exports.renderLoginForm = (req, res) => {
    res.render("user/login.ejs");
};

// login..............
module.exports.userLogin = async (req, res) => {
    req.flash("success", "Welcome back DEALSDRAY ONLINE PVT.LTD");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl)
};

//signup page render..........
module.exports.renderSignupForm = (req, res) => {
    res.render("user/signup.ejs");
};

//signup...............
module.exports.userSignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let user = await User({ username, email });
        let registerUser = await User.register(user, password);
        req.login(registerUser, (err) => {
            if (err) {
                return nextTick(err);
            }
            req.flash("success", "Welcome to DEALSDRAY ONLINE PVT.LTD")
            res.redirect("/")
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }

};

//logout..................
module.exports.userLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully")
        res.redirect("/")
    })
};