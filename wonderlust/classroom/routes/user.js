const express=require("express");
const router=express.Router();


//INDEX-USERS
router.get("/",(req,res)=>{ //app nahi pan router chi access ahe mhanun router. as kele
    res.send("GET for  users")
})


//show-USERS
router.get("/:id",(req,res)=>{
    res.send("GET for user id")
})

//POST -USERS
router.post("/",(req,res)=>{
    res.send("post for  users ")
})

//DELETE-USERS
router.delete("/:id",(req,res)=>{
    res.send("delete for  user id")
})


module.exports=router //ya file chya router oject la exports kele