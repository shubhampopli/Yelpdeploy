const http=require('http')
const port = 3000

var express= require("express");
var app2=express();


app2.get("/",function(req,res)
       {
            res.send("hi, there welcome to my assignment");
    
})

app2.get("/speak/:animal",function(req,res)
{
    var animal=req.params.animal;
    var sound="";
    if(animal==="pig")
        {
            sound="oink"
        }
    else if(animal==="cow")
        {
            sound="mowwwwww";
        }
    res.send("animal "+ animal +" sound "+ sound);
});


app2.get("/repeat/:hello/:num",function(req,res){
    var action = req.params.hello;
    var num = Number(req.params.num);
    result="";
    
    for(var i=0;i<num;i++){
         result +=action;
 
        
    }
       
        res.send(result);
   
    
})


app2.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});
