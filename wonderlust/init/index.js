const mongoose= require ("mongoose");
const initData=require("./data.js");
const Listing= require("../models/listing.js")//model la require kele listing vale

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust")
}//mongoose chya url la variable madhe pan store karu shakt const MONGO UTL =" " as karun 

main().then(()=>{
    console.log("connected to DB")//main function la call kele 
}).catch((err)=>{
    console.log(err);
});

const initDB=async() =>{    //he delete ka nhi zale kay mahiti jast lakshya nahi dile tyachavar
    await Listing.deleteMany({});//jo pahila data honar to sarve delete mag nantar new data add
    initData.data = initData.data.map((obj)=>({...obj,owner: "669cad6d3f243848f487676c"})); //initdata madhe tuat data array la access karu tya array la access karun mapn new array banavnar tyat sarve hya lie chi property new array madhe inset honar  tyavar map function apply karnar map kay karnar map har yek indivudal listing object ke liye  us object ke andar jake new priperty ko add kar dega ...obj conver object to new object yenar and owneer define karu with this id   and to new array return jalyavr  initData.data = same variable madhe  yat store karnar tya sarve listing collection darek listing sobat tyachi owner id disnar
    await Listing.insertMany(initData.data); //data key la access karayche ahe mhanun .data te data.js file madhun export kele hote na tya data object chi key la access kele
    console.log("data was initialized");
};

initDB();//initDb function la call kele
//terminal madhe cd init karun init folder madhe jaun tyanantar node index.js kara