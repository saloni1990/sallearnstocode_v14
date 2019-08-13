var express = require("express");

var router = express.Router();
var Blog = require("../models/blog");
var passport = require("passport");
var User = require("../models/user");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

// BLOG PAGE

//VIEW BLOG POSTS
router.get("/", function(req, res){
    console.log(req.user);
    Blog.find({}, function(err, allPosts){
        if(err){
            console.log(err);
        } else {
            res.render("posts/blog", {blog: allPosts});
        }
    });
     
});

// NEW BLOG POST - NEW - show form to create a new campground

router.get("/newpost", middleware.isLoggedIn, function(req, res){
   res.render("posts/new-post");  
});

//CREATE BLOG POST ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var title = req.body.blog.title;
    var image = req.body.blog.image;
    var post = req.body.blog.post;
    var category = req.body.blog.category;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var blog = {title: title, image: image, post: post, category: category, author:author};
    req.body.blog.post = req.sanitize(req.body.blog.post);
    Blog.create(blog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            req.flash("success", "Successfully added blog post!")
            res.redirect("/blog");
        }
    });
});



//SHOW BLOG POST  ROUTE //SHOW - shows more info about one blog post

router.get("/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            res.redirect("/blog");
        } else {
            console.log(foundPost);
            res.render("posts/show-post", {blog: foundPost});
        }
    });
});

//EDIT POST ROUTE
router.get("/:id/edit", middleware.checkBlogOwnership, function(req,res){
    Blog.findById(req.params.id, function(err, foundPost){
        res.render("posts/edit-post", {blog: foundPost});
    });
});

//UPDATE POST ROUTE
router.put("/:id", function(req, res){
       req.body.blog.post = req.sanitize(req.body.blog.post);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

//DELETE POST ROUTE
router.delete("/:id", middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog");
        } else {
            req.flash("success", "Successfully deleted blog post!")
            res.redirect("/blog");
        }
    });
});



module.exports = router;