const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');
const ExpressError=require("./ExpressError")
const port = 8080;

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
    console.log("App is listening...............");
})

main()
    .then(() => {
        console.log("connection is successful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp")
}

// Index Route.............

app.get("/", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });

})

// New Chat Route.............

app.get("/chats/new", (req, res) => {
    throw new ExpressError(500,"hello i am error")
    res.render("new.ejs");

})

// New Chat Post route................

app.post("/", (req, res) => {
    let { from, to, msg } = req.body;
    let addChat = new Chat(
        {
            from: from,
            to: to,
            msg: msg,
            created_at: Date()
        }
    )

    addChat.save()
        .then(() => {
            console.log("Data is saved");
        }).catch(() => {
            console.log("Data is not saved");

        })
   res.redirect("/")
   console.log(from,to,msg)


})

// new show Route ...............

app.get("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
     throw new ExpressError(404,"Chat not found");
    }
    res.render("edit.ejs", { chat })
})
// Edit Route ...............

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
  
    res.render("edit.ejs", { chat })
})

// Update Route .....................

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);
    let updatChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    )
    console.log(updatChat);
    res.redirect("/")
})

// Delete Route .....................

app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let delChat = await Chat.findByIdAndDelete(id)
    res.redirect("/")
})
// Error handling midelware
app.use((err,req,res,next)=>{
    let {status=500,message="some error"} = err;
    res.status(status).send(message)

})