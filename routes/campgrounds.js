var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");


router.get("/index",function(req,res){
    res.render("campgrounds/landing");
    
})
router.get("/",function(req,res){
        Campground.find({},function(err,campgrounds){
            if(err){
                console.log(err);
            }
            else{
               res.render("campgrounds/campgrounds",{campgrounds:campgrounds});
            }
        });
               
    
}) 
router.post("/",function(req,res){
   var name= req.body.name;
    var img=req.body.img;
    var description=req.body.description;
    var newCampground ={name:name,img:img,description:description}
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
            
        }
    })
    
});



router.get("/new",function(req,res){
        res.render("campgrounds/new");
        })


router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/show",{campgrounds:foundcampground})
        }
    })
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",  function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


module.exports = router;