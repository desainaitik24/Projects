const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    const url = "https://official-joke-api.appspot.com/random_joke";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const jokes = JSON.parse(data);
            const setup = jokes.setup;
            const punchline = jokes.punchline;
            res.send('<center><div style=\'width: 50%; height: 400px; font-family: "Century Gothic"; background: rgb(224, 240, 255); display: flex; flex-direction: column; justify-content: space-evenly; border: 2px solid rgb(9, 58, 64);\'>'+'<h1 style=\'color: #0e1d2f; margin:0px 20px;\'> '+setup+'</h1>'+'<h1 style=\'color: #0e1d2f; margin:0px 20px;\'> '+punchline+'</h1></div></center>');
        });
    });
});

app.listen(3000,()=>{
    console.log("Server is running on PORT 3000.");
});
