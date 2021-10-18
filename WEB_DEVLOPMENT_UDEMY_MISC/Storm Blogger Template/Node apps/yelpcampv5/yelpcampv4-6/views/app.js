const http=require('http')
const port = 3000

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user")

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use(express.static(__dirname + "/public"));



app.get("/",function(req,res){
    res.render("campgrounds/landing")
})



    
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


app.get("/campgrounds",function(req,res){
        Campground.find({},function(err,campgrounds){
            if(err){
                console.log(err);
            }
            else{
               res.render("campgrounds/campgrounds",{campgrounds:campgrounds});
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





//=========comments========

app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
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
    



//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds"); 
        });
    });
});



//==login========
//============================
//==============

// show login form
app.get("/login", function(req, res){
   res.render("login"); 
}); 



// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});



app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function() { 
  console.log('Server listening on port 3000....    '); 
    
});