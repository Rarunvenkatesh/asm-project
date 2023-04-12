// imports
const express = require("express");
const bodyparser = require("body-parser");
const satelize = require("satelize");
const ejs = require("ejs");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const saltrounds = 10;
const app = express();
// app creatiom
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
// database
mongoose.connect('mongodb://127.0.0.1:27017/usrDB ');
const userschema = new mongoose.Schema({
    name: String,
    password : String,
    email: String
});
const User = new mongoose.model("User", userschema);

// get and post for authentication
app.get("/", function(req , res){
    res.render("login");
});
app.get("/voice", function(req , res){
res.render("mechanicbook")
});
app.get("/usr", function(req , res){
    res.render("index")
});
app.get("/mech", function(req , res){
    res.render("index")
});
app.get("/register", function(req , res){
    res.render("register");
});
app.get("/registermech", function(req , res){
    res.render("registermech");
});
app.post("/voice", function(req , res){
    res.render("mechanicbook")
 });

app.post("/mechanicbook", function(req , res){
    navigator.geolocation.getCurrentPosition(function ( position) {
        console.log(position)
      })
    // const ip = 49.205.87.49;
    // satelize.satelize({ip: '49.205.87.49'},function(err,payload){
    //     console.log(payload);
    
});


app.post("/register", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUser = new User({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUser.save()
       .then(data => {
        res.render("index")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/registermech", function(req , res){
    bcrypt.hash(req.body.password, saltrounds, function(err, hash) {
        const newUser = new User({
        name: req.body.username,
        password: hash,
        email: req.body.email
    });
       newUser.save()
       .then(data => {
        res.render("index")
      })
      .catch(err => {
        console.error(err);
     });
   });
});
app.post("/usr", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
console.log(username);
    User.findOne({ name:username})
    .then((foundUser) => {
        if(foundUser){
            bcrypt.compare(password, foundUser.password, function(err, result) {
                if(result === true){
                res.render("index")
                }
            });
            }
        })
.catch((err) => {
    console.log(err);
    res.send(3000, " bad rewq");
       });
    });
app.post("/mech", function(req, res){
    const mechUsername = req.body.mechusername;
        const mechPassword = req.body.mechpassword;
    
        User.findOne({ name:mechUsername})
        .then((foundUser) => {
            if(foundUser){
                bcrypt.compare(mechPassword, foundUser.mechPassword, function(err, result) {
                    if(result === true){
                    res.render("index")
                    }
                });
                }
            })
    .catch((err) => {
        console.log(err);
        res.send(3000, " bad rewq");
           });
        });
    


app.listen(3000, function(){
    console.log("the server is running in port 3000");
});

