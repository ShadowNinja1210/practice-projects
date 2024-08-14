const express = require("express");
const app = express();
const { response } = require("express");
const https = require("https");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){

  //requesting html data
  const query = req.body.cityName

  //Defining url for the API link
  const apiKey = "bb770d382890d7bc0a4cb8552890be01"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  
  //Getting url and giving data as response
  https.get(url, function(response){
    console.log(response.statusCode);

    //Responding the data & Parsing JSON data into JavaScript Data
    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDesc = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is: " + temp + " degree celcius.</h1>")
      res.write("<p>The weather is currently " + weatherDesc + ".</p>")
      res.write("<img src=" + imageUrl + ">")
      res.send
    })
  })
})
  
//listening to the port 3000 
app.listen(3000, function(){
  //console.logging Server is ready
  console.log("Server is running on port 3000.")
})