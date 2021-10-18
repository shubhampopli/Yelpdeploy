const mongoose = require("mongoose");
const express = require("express");
const app = express();
url=process.env.DATABASE||"mongodb://localhost/yelp_camp_v10";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = process.env.PORT 
app.get("/", (req, res) => {
  return res.send("Home page");
});

const admin = (req, res) => {
  return res.send("this is admin dashboard");
};

const isAdmin = (req, res, next) => {
  console.log("isAdmin is running");
  next();
};

app.get("/admin", isAdmin, admin);

app.get("/login", (req, res) => {
  return res.send("You are visiting login route");
});

app.get("/signup", (req, res) => {
  return res.send("You are visiting signup route");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});