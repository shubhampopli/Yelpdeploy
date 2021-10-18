const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/cats_app",{useNewUrlParser:true});
const catSchema=new mongoose.Schema({
    name:String,
    age:Number,
    temprament:String
});

var Cat =mongoose.model("Cat",catSchema);

        //var george =new Cat({
        //    name:"george",
        //    age:11,
        //    temprament:"bad"
        //});
//
        //var george =new Cat({
       //     name:"Mrs.Norris",
        //    age:15,
        //    temprament:"good"
        //});
//
//
        //var george =new Cat({
        //    name:"jerry",
        //    age:3,
        //    temprament:"cute"
        //});
        //var george =new Cat({
        //    name:"macuu",
        //    age:4,
        //    temprament:"evil"
        //});

//george.save(function(err,cat){
   // if(err){
    //    console.log("something went wrong.");
   // }
    //else{
    //    console.log("added sucssesfully!!");
   //     console.log(cat);
    //}
//});

Cat.create({
    name:"chinki",
    age:12,
    temprament:"good"
},function(err,cats){
    if(err){
        console.log("erorrrrr!!!!!");
    }
    else{
        console.log(cats);
    }
});





Cat.find({},function(err,cats){
    if(err){
        console.log("erorrrrr!!!!!");
    }
    else{
        console.log("searching begins<------>")
        console.log(cats);
    }
});