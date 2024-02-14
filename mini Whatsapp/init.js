const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

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

let allChat = [

    {
        from: "rohit",
        to: "mohit",
        msg: "hello",
        created_at: new Date()
    },
    {
        from: "sarika",
        to: "kintu",
        msg: "hello kintu",
        created_at: new Date()
    },
    {
        from: "sneha",
        to: "priti",
        msg: "shello priti",
        created_at: new Date()
    },
    {
        from: "mohit",
        to: "ankit",
        msg: "hello ankit",
        created_at: new Date()
    },
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheet",
        created_at: new Date()
    },
    {
        from: "manoj",
        to: "sakshi",
        msg: "hello sakshi",
        created_at: new Date()
    },
    {
        from: "ujju",
        to: "ashish",
        msg: "hello ashish",
        created_at: new Date()
    },
    {
        from: "ashish",
        to: "sahil",
        msg: "hello sahil",
        created_at: new Date()
    },

]

 Chat.insertMany(allChat);

