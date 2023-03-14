const express = require("express");
const https = require("https");
//const request = require("request");
const bodyParser  = require("body-parser");
const { findSourceMap } = require("module");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})


 app.post("/",function(req,res){
  
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  const data = {

   members : [
    {
         email_address : email,
         status : "subscribed",
         merge_fields : {
              FNAME : firstName,
              LNAME : lastName
         }
    }
   ]


  };

  const jsonData = JSON.stringify(data);
  
  const url = "https://us21.api.mailchimp.com/3.0/lists/24b13d9df5";
  const options = {
    method : "POST",
    auth : "pragya:b048e477dd9f0b3fe2beb668d2996b47-us21",
  }
  const request = https.request(url,options,function(response){
      if (response.statusCode ===200){
        res.sendFile(__dirname+"/success.html");
      }else{
        res.sendFile(__dirname+"/failure.html");
      }
       response.on("data",function(data){
        console.log(JSON.parse(data));
       })
  })
  
  request.write(jsonData);
  request.end();
 })

 app.post("/failure",function(req,res){
    res.redirect("/");
 })

app.listen(process.env.PORT || 3000,function(){
    console.log("Serrver is running onn 3000");
})

// API KEY
// b048e477dd9f0b3fe2beb668d2996b47-us21

// unique Id
// 24b13d9df5