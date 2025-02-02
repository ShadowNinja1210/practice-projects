const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/83a84b3a7e"

    const options = {
        method: "POST",
        auth: "news:0eb1c6502a4363c36d59c5abb145effe-us21"
    };

    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
        const status = response.statusCode;
        if (status == 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }
    })

    request.write(jsonData);
    request.end();

})

app.listen(3000, function(){
    console.log("Server is listening to port 3000");
});