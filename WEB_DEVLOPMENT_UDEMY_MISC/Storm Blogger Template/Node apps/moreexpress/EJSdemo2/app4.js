const http=require('http')
const port = 3000


var express=require("express");
 var friends=["tony", "justin", "micky", "nsalkn",];

var app4= express();
var bodyParser = require('body-parser')
app4.use(bodyParser.urlencoded({
    extended: true
}));
   
app4.use(express.static("public"));
app4.set("view engine","ejs");

app4.get("/",function(req,res){
    res.render("home");
});

    
app4.get("/friends",function(req,res){


    
    res.render("friends",{friends:friends});    
})

app4.post("/add",function(req,res){
    var newfriendss=req.body.newfriend;
    friends.push(newfriendss);

    res.redirect("/friends");
  
})

app4.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});