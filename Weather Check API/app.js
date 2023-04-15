const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/",(req,res)=>{
    const city = req.body.city
    const apiKey = "f277068668cdbfd6be1f125c131ed140"
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units="+unit;
    https.get(url,(response)=>{
        console.log(response.statusCode);
    
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    
            res.write("<p>Weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The tamperature in " + city + " is " + temp + " Celcius.</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })    
})


app.listen(3000,()=>{
    console.log("Server is running on PORT 3000.");
})