const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.get("/bmicalculator", function(req, res){
  res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
  var h = Number(req.body.height);
  var w = Number(req.body.weight);

  var bmi = w /(h*h);
  res.send("BMI is " + bmi);
})

app.post("/", function(req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send("Answer is " + result);
})

app.listen(3000, function(){
  console.log("Server is starting at port: 3000")
});
