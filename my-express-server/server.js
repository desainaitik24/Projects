const { table } = require("console");
const express = require("express");
const path = require("path");

const app = express();

app.get("/",(req,res)=>{
    res.send("<h1>Home Page</h1>");
})

app.get("/contact",(req,res)=>{
    res.send("Contact me : desainaitik48@gmail.com");
});

app.get("/hobbies",(req,res)=>{
    res.send("<ul><li>Sports</li></ul>");
});
//routing parameters
app.get("/hobbies/:topic/subtopic/:cTopic",(req,res)=>{
    console.log(req.params);
});

app.listen(3000, function(){
    console.log("Server started");
});