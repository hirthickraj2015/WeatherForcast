const express = require('express');
const https= require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended:true}));
app.get('/', function (req, res) {
    res.sendFile(__dirname +"/index.html");
});
app.post('/', function (req, res) {
    const city=req.body.cityName;
    const apiKey="5cc575b8b162a696f75199c7c8ada633";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units=metric";
    https.get(url, function (response){
          response.on("data", function (data){
            const weatherData = JSON.parse(data);
            const temp= weatherData.main.temp;
            const disc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon
            const imageurl="http://openweathermap.org/img/wn/"+ icon+ "@4x.png"
            res.write("<html");
            res.write("<p>The Weather is currently "+disc+" .</p><br/>");
            res.write("<h1>The weather in "+ city +" today is " + temp +" degree Celcius;</h1>");
            res.write("<img src="+ imageurl+">");
            res.write("</html>");
            res.send();
         });
    })
});



















app.listen(3000,function(){
    console.log("Listening @ 3000 ");
})