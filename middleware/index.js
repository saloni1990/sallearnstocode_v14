//all the middleware goes here

var Blog = require("../models/blog");
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var middlewareObject = {};


middlewareObject.checkBlogOwnership = function(req, res, next){
     if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundPost){
          if(err){
              req.flash("error", "Blog not found");
              res.redirect("back");
          } else {
          //if user is logged in, does the user own the campground?
               if(foundPost.author.id.equals(req.user._id)){
                    next();
               }else{
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
               }
          }
    });
        //otherwise redirect
    } else {
        req.flash("error", "You need to be logged in to do this.")   
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwnership = function(req, res, next){
     if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
               if(err){
                  res.redirect("back");
               } else {
                    //if user is logged in, does the user own the comment?
                    if(foundComment.author.id.equals(req.user._id)){
                    next();
               }else{
                req.flash("error", "You don't have permission to do that.")   
                res.redirect("back");
               }
          }
     });
        //otherwise redirect
     } else {
         req.flash("error", "You need to be logged in to do this.")   
        res.redirect("back");
     } 
};

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do this.")
    res.redirect("/login");
};




module.exports = middlewareObject;