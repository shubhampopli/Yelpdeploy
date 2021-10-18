var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");//adding it againnnnnn

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);//take our package and add functions to user scehma        

module.exports = mongoose.model("User", UserSchema);