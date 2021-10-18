const http=require('http')
const port = 3000

var express=require("express");
var app=express();

app.get("/",function(req,res)
       {
    res.send("hiii there...");
})
app.get("/hi",function(req,res){
    res.send("hi dude wssup??");
})
app.get("/dog",function(req,res){
    res.send("bow bow bow");
})

app.get("/cat",function(req,res){
    res.send("meow meow meow");
    
})
app.get("/elephant",function(req,res){
        res.send("ele ele ele ele");
        })

app.get("/r/:subredditName",function(req,res){
    var name = req.params.subredditName;
    res.send("welcome to sure reditt "+ name.toUpperCase() +" users");
})
app.get("/r/:suredditName/comments/:id/:title/",function(req,res){
    console.log(req.params);
    res.send("welcommeeee"); 
})

app.get("*",function(req,res){
    
    res.send("page not found");
})

app.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});
