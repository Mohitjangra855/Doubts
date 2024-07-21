// .env file direct access hot nahi mhnaun npm package use karu tya .env file cha key=value access sathi
if(process.env.ENV !="production"){
    require("dotenv").config();
} //jevha apana production mhanje deploy karu tevha he .env file deploy anhi honar ata development mhanun use karu shakto 
 //project phase 3part a
//console.log(process.env.SECRET) //evirement variable la access karat ahot and SECRET he key ahe tyachi value console madhe print honar


const bodyParser = require("body-parser")
const express=require("express");
const app=express();
const favicon = require('serve-favicon'); //favicon icon sathi package download kele tyala require kele
const mongoose=require("mongoose");
//  const Listing=require("./models/listing.js"); //apan te export kele hote na Listing model la tyala require karu "../models/listing.js" models folder madhe jaun listing.js file madhe export kele hote tyala require kar
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate"); //npm i ejs-mate package instaall kele mag require kele
// const wrapAsync=require("./utils/wrapAsync.js")//wrapAsync file la require kele custoom error handling sathi
const ExpressError=require("./utils/ExpressError.js")//ExpressError file la require kele 
// const {listingSchema} =require("./schema.js"); //joi validation kele hote na to schema la require kele  {listingSchema} ha object hota mhanun tyala curly braces madhe takle
// const Review=require("./models/review.js");// review model la require kele
//const {reviewSchema} =require("./schema.js"); //review joi cha schema la require kele
const session = require("express-session") //express-session package la install karun require kele 
const flash = require("connect-flash") //connect-flash che package install karun tyala require kele 
const passport = require("passport"); //passport la require kele authentication sathi
const LocalStrategy = require ("passport-local"); //passport-local la require kele
const User = require("./models/user.js")//user.js la require kele 


const listingsRouter = require("./routes/listing.js") //listing.js la require kele
const reviewsRouter = require("./routes/review.js"); //routes chya folder madhun review.js file  la review la require kele
const userRouter = require ("./routes/user.js") // user  la require kele 


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
}//mongoose chya url la variable madhe pan store karu shakt const MONGO UTL =" " as karun 

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.json())
app.use(express.urlencoded({extended:true}));//id sathi request madhla data parse karnyasathi
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"));//method override la npm insatll karu first require kele mag tyala app.use kele
app.engine("ejs",ejsMate);//npm i ejs-mate package la use karat ahot
app.use(express.static(path.join(__dirname,"/public"))); //public folder la access kele
app.use(favicon(__dirname + '/public/images/airbnb.ico')); //favicon icon la use kele require kele first mag nantar use kele

main().then(()=>{
    console.log("connected to DB")//main function la call kele 
}).catch((err)=>{
    console.log(err);
})

const sessionOptions={
    secret: "mysupersecretcode",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60  * 1000, //yek hafta nantar 7 days nantar  date and time la expire honar cookie 7days+24 hours+60 minut+60 second+1000 milisecond
        maxAge: 7 * 24 * 60 * 60  * 1000,
        httpOnly:true,
    },
}; //he jale sessions options


app.get("/",(req,res)=>{
    res.send("hii i am root")
});

//SESSION
app.use(session(sessionOptions)); //use kele session chya sessionOption la  session work karat ahe ki nahi te check karnyasathi local host var jaun inspect karne and application var jaun connectedsid cookies madhe asel connectedsid means connected session id is called session work karat ahe 
app.use(flash());//routes la use karnyacha aadhi flash la use karu

//PASSPORT 
app.use(passport.initialize()); //har yek request ke liye passport initialize ho jayega passport ko use karne se pehle initialize karna padega
app.use(passport.session()); // 1 session ke andar user q hi bar login kare ya 1 hi bar signup kare use bar bar har request pe login na karna pade yasathi passport.session() middleware la use karta
passport.use(new LocalStrategy (User.authenticate())); // je user yenar te localstategy thhrow authenticate vhayla pahije pahile mg tya user la authenticate sathi USer.authenticate() method use honar  authenticate means user ko login or signup karwana (User.authenticate())) hi yek static method ahe by default mongoose ne add keley

passport.serializeUser(User.serializeUser()); //he npm chya documentation madhun ghetlay code he serialize karte te don method use karnar user.serializeuser serialize mens user related information la save karwana seesion madhe is call serialize 
passport.deserializeUser(User.deserializeUser()); //he npm chya documentation madhun ghetlay code he deserialize karte te don method use karnar user.deserializeuser user relate information la undtore karana means user chi information la kadhne is called deserialize



app.use((req,res,next)=>{
    res.locals.success = req.flash ("success") //req.flash madhun success key cha konta pan messge alyavar res.local.success amdhe save honar
    res.locals.error = req.flash ("error") //req.flash ("error ") kahi error yenar tar error key la  message alyavar res.local.error amdhe save honar
    res.locals.currUser = req.user; //res.local.currUser menas currentuse he variable ghetle te req.user chi information store karnar currentuser means abhi jisbhi user ka current session chal rha he usse related information
    next();
}) //pahile listing.js madhe messge flash kela mg he middleware ahe flash che index.ejs madhe bgh success pass kela & new listing la create karu website madhun tevha messge flash hoil but styling sathi tyala direct boilerplate adhe flash karu 



//DEMO USER PASSPORT
// app.get("/demouser",async(req,res)=>{
// let fakeUser=new User({
//     email: "student@gmail.com",
//     username: "delta-student", //apan user.js model madhe fakt email la lihile hote but passport username automatic add karun dete user schema ke andar
// }); //fake user la create kele
// let registeredUser = await User.register(fakeUser, "helloworld") //yachane fake user save honar register hi static method ahe and helloworld he password ahe 
//     res.send(registeredUser)
// } ) //new user create karat ahot demouser name ne & localhost:8080/demouser ne disel user te helloworld cha password hashing function ne hash honar password and passport ha salt pan add karun denar password var jast secure sathi  te hash form password chi create jaleli ti save honar database madhe 




// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:12000,
//         location:"calenguate,goa",
//         country:"india",
//     });//sampleListing la create keli

//  await sampleListing.save(); //async await kele mhanun nahitar yithe then() function pan vapru shakle aste
//  console.log("sample was saved");
//  res.send("successful testing");

// });//document ko add kar rhe he 
//localhost:8080/testListing kelyavar message show honar successful testing and db madhe te sarve data save store honar 



// VALIDATE LISTING VALIDATE FOR SCHEMA MIDDLEWARE
// const validateListing=(req,res,next)=>{
//     let {error}= listingSchema.validate(req.body); //req.body tya joi cha schema la satisfy karat ahe all condition te validate karnar
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(","); //ji pan terminal madhe error detail yenar tyacha fakt message yenar and te join honar separat comma , tun
//         throw new ExpressError(400,errMsg);//result.error yenar hopscotch var listings add kartana error ala ki joi result cha error show karnar direct hopescotch chya html page var
//     }else{
//       next();  
//     }
// };


// const validateReview=(req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body); //req.body tya joi cha schema la satisfy karat ahe all condition te validate karnar
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(","); //ji pan terminal madhe error detail yenar tyacha fakt message yenar and te join honar separat comma , tun
//         throw new ExpressError(400,errMsg);//result.error yenar hopscotch var listings add kartana error ala ki joi result cha error show karnar direct hopescotch chya html page var
//     }else{
//       next();  
//     }
// };


app.use("/listings",listingsRouter); //routes chya listing.js la use kele
app.use("/listings/:id/reviews",reviewsRouter); //routes chya review.js la use kele
app.use("/",userRouter) //userRouter la use kele

//INDEX ROUTE
// app.get("/listings",wrapAsync(async (req,res)=>{
//   const allListings= await Listing.find({});//await function la allListings variable madhe store kele
// //   console.log(allListings);  
//   res.render("listings/index.ejs",{allListings}); //index.ejs sathi pahile require krave lagel path la te 5 no chi line var kele ahe and views folder madhe listings navche folder asel tyat  index.ejs file banvavi lagel and 12,13 line var view engin app.set kele 
// }));//async and await nahi tyachi jagevar .then function use kela asta tari challe aste


//NEW ROUTE
// app.get("/listings/new", (req,res)=>{
//     res.render("listings/new.ejs");
// })//yat error yet ahe mhanun te /new ha varti je /listings/:id id samjat ahe te mhanun show route chya varti theu & create route khali karat ahe karan form tar banavla pan to form ja data jo aapn form madhe lihinar to create honyasathi create route khali banavla ahe 



// SHOW ROUTE
// app.get("/listings/:id",wrapAsync(async (req,res)=>{
//     let{id}=req.params; //id body madhun ghenayasathi urlencoded te 14 no chi line var kele ahe tithe parse kele ahe 
//    const listing= await Listing.findById(id).populate("reviews"); //ji id yenar tyala listing variable madhe store karu .populate(reviews) hya listings sobat review cha data pupulate kara with their detail
//    res.render("listings/show.ejs",{listing})
// }));//title var click kelyavar purn detai yenar tya id chi jyachavar click kele ahe  


//CREATE ROUTE   
// app.post("/listings",validateListing,wrapAsync(async(req,res)=>{ //database madhe changes karu karan create karat ahe mhnun async kahi na kahi promise return karel yis route pe call ayegi to pehle valiate kiya jayega listing ko tabhi ham aage ka jo kam he ham vo karenge 
//     // let {title,description,image,price,country,location}=req.body //ha yek tarika ahe sare ke sare variables extract karu better wat new.ejs madhe object chi key banavu sarvanna
//     // let listing=req.body.listing;//te object che key value banavle tyannantar as access karu tyanna hya line la kahli instance madhe create kele ahe
//   const newListing= new Listing(req.body.listing);  //parse kele new listing la create karnar and newListing variable madhe store karu
//     await newListing.save();//newListing je apan create karu form madhun te save honar
//     res.redirect("/listings");//form madhe data fill jalyavar to dave save houn to listings madhe redirect karel
// }));//wrapAsunc file la attach kele error handling sathi karan server side tun jar kahi wrong information create honar jase ki price number chi jagevar character takli tar error yenar te err kade janar sarvat khali last la error handling route create kelela ahe to something wait wrog msg yenar page var

//do wthe thing whic is causing let me see from starting bro me hopscotch se listening nahi create kar pa rha error aa rha he jab hopscotch se listing create ker rha hu to
//see apne validations and wo sab laga rkha hai agar ek bhi field miss hoti hai to hopscoch se error create hogi aap hopscotch se create karke dehkho listenings 
//karo tum create me dekhta hu kese error arha hai

//EDIT ROUTE
// app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
//     let{id}=req.params; 
//     const listing= await Listing.findById(id); 
//     res.render("listings/edit.ejs",{listing}); //listing la pass keli  te edit.ejs la pass kele
// })); //form serve karun denar

//UPDATE ROUTE
// app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
//     let {id} = req.params;
//    await Listing.findByIdAndUpdate(id,{...req.body.listing})//deconstruct karu id la te javascript chi object ahe tyat parameter ahe tyala deconstruct karun parameter la accesaa karu jisko ham new update value ke sath pass kar denge
//     res.redirect(`/listings/${id}`); //${id} show var redirect honar
// }));;


//DELETE ROUTE
// app.delete("/listings/:id",wrapAsync(async(req,res)=>{
//     let{id}=req.params; //id la extract keli
//    let deltedListing= await Listing.findByIdAndDelete(id);
//    console.log(deltedListing);
//    res.redirect("/listings");
// })); //id ne delete honar 
//fakt ya phase madhe aapn CRUD operation perform and databse create and api la baghitle model la create kele and connection ko establish kiya and database la initialise kele

// Listing.findByIdAndDelete("6639a6142a6fe9c0b22cd8c0").then((res)=>{
//     console.log(res);
// })

// Listing.findByIdAndDelete('6639a52dcded281e2708dd34').then((res)=>{
//     console.log(res);
// })



//REVIEWS ROUTE MADHE POST ROUTE CREATE KARAT AHOT
// app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{ //validateReview la as a middleware pass kele and error handling sathi wrapasync pass kele basic error handling sathi
//    let listing= await Listing.findById(req.params.id) //listing find out karnar pahile
//     let newReview= new Review(req.body.review);//request chi body madhe je review ale hote te yenar

//     listing.reviews.push(newReview);//apan listings madhe reviews cha array banavla hota tyat push karu 

//    await  newReview.save();
//    await listing.save();
   
//    res.redirect(`/listings/${listing._id}`);
// })); //client side tun pan review add karu shakto and hopscotch varun server side varun pan new review add karu shakta



//REVIEWS DELETE ROUTE
// app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async (req,res)=>{
//     let {id, reviewId} =req.params;
//      await Listing.findByIdAndUpdate(id,{$pull:{ reviews: reviewId}}) //aplyala reviews array tun reviewId la delet ekarayche mhanun mongo madhe  special $ pull operator bghu mhanje {$pull{reviews:reviewID}} reviews array madhe jaun ti review id jayaca review ne match jali tar ti delete karnar
//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listings/${id}`);
// }))




app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"))
}) //konti pan wrong request yenar sarve cha sarve tar page not found ch message yenar starting la sarve route check honar jar match nahi jale tar 404 statuscode and messga page not found yenar


// app.use((err,req,res,next)=>{
//     let{statusCode=500,message="something went wrong"}=err; //je error yenar te proper yenar ata error tun status code and messgae yenar page var error cha  or statuscode=500 & messgae =something went wrong he default values ahe 
//     res.status(statusCode).render("listings/error.ejs",{message}); //error cha messge la error.ejs file madhe passs kele
//     res.status(statusCode).send(message);
//     // res.send("something went wrong")
// })//middleware error handling pahile error jar ala kahi price chi value character madhe jali create kartanna listenings tar error yenar tar te something wend wrong msg show karnar page var

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err; // Extract error status and message
    console.error(err.stack);
    res.status(statusCode);
    if (res.headersSent) { // Check if headers are already sent
        return next(err);
    }
    res.render("listings/error.ejs", { message }); // Render the error page
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})

//je je asynchronius rout asel tyala asyncWrap ne wrap karu error handling sathi