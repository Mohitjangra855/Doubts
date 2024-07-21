//controller yat backent cha core functionality store honar 
//routes forlder chya listing.js file madhun callbacks shift karu ithe 
//routes madhun kadhle routes madhe actual konse path pe request ane ke bad kya kam honar chaiye yitna hi ghoga routes me isliye separate kele callbacks la backend core functionality sathi tyamude controller madhe purn async callbacks vale kam asnar purn
//and this is implementation of MVC frameworkk
//basically web development madhe code la structure dene pan garjeche ahe impression and readable code sathi 

const Listing = require("../models/listing") //require kele listing la index pass karnyssathi


module.exports.index = async (req, res) => { //index ch kam ahe sari ki sari listings ko render karana
  const allListings = await Listing.find({});//await function la allListings variable madhe store kele
  // console.log(allListings);  
  res.render("listings/index.ejs", { allListings }); //index.ejs sathi pahile require krave lagel path la te 5 no chi line var kele ahe and views folder madhe listings navche folder asel tyat  index.ejs file banvavi lagel and 12,13 line var view engin app.set kele 
}


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}


module.exports.showListing = async (req, res) => {
  let { id } = req.params; //id body madhun ghenayasathi urlencoded te 14 no chi line var kele ahe tithe parse kele ahe 
  const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner"); //ji id yenar tyala listing variable madhe store karu .populate(reviews) hya listings sobat review cha data pupulate kara with their detail .popualate("owner ") har yek owner ki information chaiye chaning hot ahe  path:reviews means han reviews ke path ke sath populate karna chahte he apni listing ko  and har yek individual review ke liye path me author ajaye nested form madhe populate kele 
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!") //jar listig exist nasel karat tar messge flash kar
    res.redirect("/listings") //redirect kar /listings page var
  }
  res.render("listings/show.ejs", { listing })
}



// module.exports.createListing = async(req,res)=>{ //database madhe changes karu karan create karat ahe mhnun async kahi na kahi promise return karel yis route pe call ayegi to pehle valiate kiya jayega listing ko tabhi ham aage ka jo kam he ham vo karenge 
//     // let {title,description,image,price,country,location}=req.body //ha yek tarika ahe sare ke sare variables extract karu better wat new.ejs madhe object chi key banavu sarvanna
//     // let listing=req.body.listing;//te object che key value banavle tyannantar as access karu tyanna hya line la kahli instance madhe create kele ahe
//    let url = req.file.path;
//    let fileName = req.file.filename;
//     // console.log(req.body.listing) //
//     const newListing = new Listing(req.body.listing);  //parse kele new listing la create karnar and newListing variable madhe store karu
//   newListing.owner =  req.user._id //ham chahte he ki newUSer ka jo owner ho usme current user ki hi id store ho passport madhe current user chi id store honar tyamule jar apan new create listing karnar tar owner username sobat yenar listing create houn jo user login ahe to create new listing karto tar tyachech username yenar tya listing chya top la 
//   newListing.image = {url, filename};
//   await newListing.save();//newListing je apan create karu form madhun te save honar
//    req.flash("success","new listing created:"); //he & middleware pan create kele ahe app.js madhe bgh flash che middleware
//     res.redirect("/listings");//form madhe data fill jalyavar to dave save houn to listings madhe redirect karel
// }




module.exports.createListing = async (req, res,next) => {
  try {
    // Check if file is uploaded
    let url = req.file ? req.file.path :
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let filename = req.file ? req.file.filename : 'defaultname';
   // when i print req.body.listing then show its undefined?
    // Create new listing object
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };


    // Save the listing
    await newListing.save();
    // Flash success message and redirect
    req.flash("success", "New listing created:");
    res.redirect("/listings");
  } catch (error) {
    // Handle errors
    console.error(error);
    req.flash("error", "Failed to create listing.");
    res.redirect("/listings/new");
  }
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!") //jar listig exist nasel karat tar messge flash kar
    res.redirect("/listings") //redirect kar /listings page var
  }
  res.render("listings/edit.ejs", { listing }); //listing la pass keli  te edit.ejs la pass kele
}

module.exports.updateListing = async (req, res) => { //pahile check ki userlogin ahe and tya isOwner ne tya user la kade permission ahe update chi tyanatar listing la validate karu  
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing })//deconstruct karu id la te javascript chi object ahe tyat parameter ahe tyala deconstruct karun parameter la accesaa karu jisko ham new update value ke sath pass kar denge
  req.flash("success", "Listing updated ") //listing update jalyavar flash honar message 
  res.redirect(`/listings/${id}`); //${id} show var redirect honar
}

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params; //id la extract keli
  let deltedListing = await Listing.findByIdAndDelete(id);
  console.log(deltedListing);
  req.flash("success", "Listing deleted") //flash messge listing delete honar tevha 
  res.redirect("/listings");
}//delete listing second name is destroy listing same 