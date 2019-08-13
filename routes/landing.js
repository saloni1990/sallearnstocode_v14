var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../models/user");

// LANDING PAGE     

router.get("/", function (req, res){
     res.render("landing", {
          topicshead: ""
     });
});


router.post("/", function(req, res){
     var hello = req.body.fname;
     res.render("landing", {topicshead: hello, currentUser: req.user});
});


//===================
//AUTH ROUTES
//===================
//show register form

//show register form
router.get("/register", function(req, res){
    res.render("register");
    
});

//handle sign-up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to the blog " + user.username);
            res.redirect("/blog");
        });
    });
});

//show login form

router.get("/login", function(req, res){
    res.render("login", {message: req.flash("error")});
});

//handling login in logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/blog",
        failureRedirect: "/login"
    }), function(req, res){
    
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully been logged out");
    res.redirect("/blog");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;