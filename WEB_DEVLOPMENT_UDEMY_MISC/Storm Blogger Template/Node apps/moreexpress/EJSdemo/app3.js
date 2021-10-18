const http=require('http')
const port = 3000


var express=require("express");
var app3= express();
var bodyparser=require("body-parser");

    var posts= [
    
        {title:"post1", author:"shubham"},
        {title:"post2",author :"idk"},
        {title:"post3",author:"nikitia popi"}
        
    ];
app3.use(bodyparser.urlencoded({extended:true}));
app3.use(express.static("public"));
app3.set("view engine","ejs");
app3.get("/",function(req,res){
    res.send("hello friends");
})

app3.get("/inlovewith/:animal",function(req,res){
    var animal=req.params.animal;
    
    res.render("home",{animal:animal}); 
})
app3.get("/posts",function(req,res){

    res.render("post",{posts:posts}); 
})
app3.post("/add",function(req,res){
    console.log(req.body);
    res.send("made a new friend");
 
    
})

app3.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});