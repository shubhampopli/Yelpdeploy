var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.use(express.static(__dirname + '/img/'));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.render("landing")
})



app.get("/campgrounds",function(req,res){
        Campground.find({},function(err,campgrounds){
            if(err){
                console.log(err);
            }
            else{
               res.render("campgrounds",{campgrounds:campgrounds});
            }
        });
               
    
}) 
app.post("/campgrounds",function(req,res){
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



app.get("/campgrounds/new",function(req,res){
        res.render("campgrounds/new");
        })


app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/show",{campgrounds:foundcampground})
        }
    })
})

// ====================
// COMMENTS ROUTES
// ====================

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});