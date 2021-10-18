const http=require('http')
const port = 3000

var express=require("express");
var app= express();
app.set("view engine","ejs");
app.use(express.static(__dirname + '/img/'));
app.use(express.static("public"));
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
    var campgrounds= [ {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"},
                       {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"},
                       {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"},
                     {name:"salmoon greek", img: "img/Cards picture.jpg"}
                     ]
app.get("/",function(req,res){
    res.render("landing")
})



app.get("/campgrounds",function(req,res){

               
    res.render("campground",{name:campgrounds});
})  

app.post("/campgrounds",function(req,res){
   var name= req.body.name;
    var image=req.body.img;
    var newcampground ={name:name,img:image}
    campgrounds.push(newcampground);
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
        res.render("new");
        })





















app.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});