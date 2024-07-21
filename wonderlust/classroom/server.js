const express = require("express"); 
const app = express();
const users = require ("./routes/user.js") //fakt require kele use pan karave lagel
const posts=require("./routes/post.js")
// const cookieParser = require("cookie-parser")//cookie parser npm package la install karun require kele
const session=require("express-session") //express-session package la instal karun require kele
const flash = require("connect-flash") //connect flash ha npm package la install karun require kele
const path = require("path")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views")) //te flash use sathi views la use karat ahot


//HOW TO SEND COOKIES
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste") ; //cookies madhe name valiue pair asta greet he name ahe and namaste tvalue ahe 
//     res.cookie("made in","india") ; ///cookies var yeda gele tar te cookies direct save honar and kontyahi other routes var gelyas cookies tyach jagevar asnar
//     res.send("sent you some cookies!")
// })//ye /getcookies request karu tar he cokkie store honar


// app.use(cookieParser("secretcode")); //cookieParser middleware la use karu 

//COOKIE PARSER
// app.get("/",(req,res)=>{
//     console.dir(req.cookies); //yithun cookies parse houn terminal madhe yenar
//     res.send("hii i am root")
// }) //cookies parse honar
 
// app.get("/greet",(req,res)=>{
//     let {name ="anonymous"} = req.cookies; //jar apan name key store keli asel cookies madhe tar ti name print kara req.cookies madhun  jar name exist nasel karat tar anonymous print honar
//     res.send(`hii ${name}`) //name chi valu send honar
// })

//SIGNED COOKIES

// app.use(cookieParser("secretcode")); //secret string define incoding sathi stamp or sill lavle yachi help ne find honar cookie madhe kahi chedchani tar nahi jhali ahe

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie send")
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies); //req.cookies me unsigned cookies print hoti he sarve
//     res.send("verified");
// })



// app.use("/users",users) //hya /route var users kadun ji request yenar tyala match karnar / match karnar users vale routes se nantar callbac vagere yenar mhanje use honar execute honar 
// /users ha common part kadhala user.js kadun mhanje /users chi mapping users file madhun kara 


// app.use("/posts",posts) //hya /route var users kadun ji request yenar tyala match karnar / match karnar posts vale routes se nantar callbac vagere yenar mhanje use honar execute honar 
// /posts ha common part kadhala post.js kadun mhanje /posts chi mapping users file madhun kara 

//asech varshe users,posts sarkhe different diffrent paths pan bavu shakta server.js madhe related paths sathi better understand sathi bulky code nahi pahije tyasathi he alag alag file madhe paths tayar karun router la require karne he beeter way ahe segregate karne ka acha tarikha ahe ye express.router






//EXPRESS SESSION PROJECT PHASE 2(PART C)
const sessionOption = ({
    secret: 'keyboard cat', //he required aslich pahije apan cookies madhe baghitle
    resave:false,
    saveUninitialized:true, //te terminal madhe warning yet hoti mhanun resave and save uninitialized kele jast information sathi npm package vachu shakta express session cha 
  }); //hyachi cookies inspect karun application madhe cookies yenar 1 ti asnar session id te browser madhe save honar in the form of cookie

app.use(session(sessionOption)); //use kele session chya sessionOption variable la 
app.use(flash()); //flash la use kele 
app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success"); //better way req.flash("success") sathi res.locals.success madhe apla msg save houn janar suucess jal tar  successMsg la pass karnar
    res.locals.errorMsg = req.flash("error"); //better way req.flash("error") sathi res.locals.errpr madhe apla msg save houn janar error ala tar errorMsg la pass karnar 
    next();
})//flash che middleware define kele har request ke liye us kam ko bar bar repeat karna he to use ham middleware ke andar shift kar sakte he  

app.get("/test",(req,res)=>{
    res.send("test successfull")
})

//USING NPM PACKAGE
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){ //jar req.session.count exist karat asel tar value 1 ne vadnar nahir exist nasel karat tar 1 ch rhanar
//         req.session.count++; //req.session yekch session la count karto 
//     }else{
//         req.session.count =1; //count name cha variable ahe express sesio madhe tyala tyachi id la 1 set keli 
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })//express session middleware chya help ne count hot ahe req.session he count temporary store hot ahe  


//STORING AND USING INFO
app.get("/register",(req,res)=>{ //query string se bheja jayega ?name=rohan as
    let {name = "anonymous"}=req.query;// name la extract kele
    req.session.name=name; //apan je pan name query string madhe lihinar te req.session.name madhe store honar hya ritine information store jali
   if(name==="anonymous"){
    req.flash("error","user not registered")
   }else{
    req.flash("success","user register successfully ") //flash honar success hi key & user registerred successfully hi value ahe 
   }
   res.redirect("/hello") //register var  /register?name=rohan and redirect /hello var and hello rohan print honar
}) //single session ka kam hota he useful information store karwana taki ham use different page par use kar sake

app.get("/hello",(req,res)=>{
    // res.send(`hello ${req.session.name}`); //query string var je name yeil te pahile req.session.name madhe store hoil mag nantar yithe use hoil hya ritine information use hotey using req.sesssion.name 
    res.render("page.ejs",{name:req.session.name}) //page.ejs madhe name: key la req.session.name chi value pass keli path la pan require kele varti tyashivay flash honar nahi & msg:req.flash("success") req.flash ke anandar jo success vala msg he o yahape msg ban jayega usi msg ko page.ejs me access karenge 
})

app.listen(3000,()=>{
    console.log("server is listings to 3000")
})



