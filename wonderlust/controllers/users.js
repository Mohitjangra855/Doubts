// MVC: CONTROLLER IMPLEMENT DESIGN PATTERN FOR  USERS
const User = require("../models/user.js"); //user model require kela


module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs"); //users folder madhe signup.ejs file madhe
}


module.exports.signup = async (req,res)=>{
    try{
        let {username,email,password} = req.body //req.body tun te form bharnar tya madhun username,email,pasword extract karnar 
         const newUser = new User({email,username}) //new User model madhun email,username pass karu
        const registeredUser = await User.register(newUser,password) //newUser and password pass kela and registered kele
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{ //req/login he method ahe passport chi yachane jar user signup jala tar to automatic login pan honar  yachane te session madhele signup user chi information store karte and tyala automatic login karte
            if(err){ //jar error exist karat asel tar
               return next(err); //return karnar next la error sobar 
            }
            req.flash("success","welcome to wonderlust") //ha msg flash hoil
            res.redirect("/listings");
        });
    } catch(err){
        req.flash("error",err.message) ; //err madhe je pan msg asnar tar te flash honar error means use jar already registered asel tar error page var yayla nahi pahije te fakt flsh vhayala pahije mhanun try and catch use kela as
        res.redirect("/signup") //redirect honar signup page var
    } 
}


module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs")
}

module.exports.login = async(req,res)=>{ //pahile saveRedirectURl save karnar mg passport.authenticate() ye yek middleware ahe je post rute cha pahile authentication ke liye use hota he npm authenticate request var jaun documentation bghu shakta & local is stratergy & {failureRedirect: "/login"}) means jar user exist nahi karat asel tar redirect ho /login page vr & failureFlash :true means jar authentication vagere fail jale user che tar flash msg pathvu shakto. te flash msg automatic failureflash:true dhakhavnar.  jar sarve case pass jale tar te khali req,res kade janar 
    req.flash("success","welcome back to wonderlust!")
    let redirectUrl = res.locals.redirectUrl || "/listings" ; //jar res.locals.redirectUrl asel tar tithe redict kara nahitar " /listings" var redirect kara
    res.redirect(redirectUrl) //redirect honar create new listing var user login jalyavar .redirectUrl variable create kela middleware.js madhe pan kele ahe  te locals madhe redirect kele hote na tithe redirect karnar 
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=> { //req.logout he already passport chi method ahe tyat err parameter define karu logout karaycha timala kahi error aala tar
        if(err){
            return next(err) //jar kahi error ala logout kartanna tar next la call karu error sobat
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings") //redirect honar main /listings page vr
    })
}