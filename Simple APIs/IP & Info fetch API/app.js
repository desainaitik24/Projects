const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/",(req,res)=>{
    const url = "https://api.ipify.org?format=json";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const ipdata = JSON.parse(data);
            const ipv4 = ipdata.ip;
            
            const infourl = "https://ipinfo.io/"+ipv4+"/geo";
            https.get(infourl,(response)=>{
                console.log(response.statusCode);
                response.on("data",(data)=>{
                    const ipInfoData = JSON.parse(data);
                    const city = ipInfoData.city;
                    const region = ipInfoData.region;
                    const country = ipInfoData.country;
                    const location = ipInfoData.loc;
                    const postal = ipInfoData.postal;
                    const tm = ipInfoData.timezone;
                    res.send('<center><div style=\'width: 50%; height: 500px; font-family: "Century Gothic"; background: rgb(224, 240, 255); display: flex; flex-direction: column; justify-content: space-evenly; border: 2px solid rgb(9, 58, 64);\'>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>IP Address : <b>'+ipv4+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>City : <b>'+city+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>Region : <b>'+region+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>Country : <b>'+country+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>Location : <b>'+location+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>Postal : <b>'+postal+'</b></p>'+
                             '<p style=\'color: #0e1d2f; margin:0px 20px;\'>Time Zone : <b>'+tm+'</b></p>'+
                             '</div></center>'
                             );
                });
            });
        });
    });
    

});

app.listen(3000,()=>{
    console.log("Server is running on PORT 3000.");
});
