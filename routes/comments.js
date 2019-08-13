var express = require("express");

var router = express.Router({mergeParams: true});

var Blog = require("../models/blog");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index.js");

//=========================
//Comments Route
//=========================

router.get("/new", middleware.isLoggedIn, function(req, res){
     Blog.findById(req.params.id, function(err, blog){
         if(err){
             console.log(err);
         } else{
             res.render("comments/new-comment", {blog: blog});
         } 
     });
     
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup blog using id
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong.")
            res.redirect("/blog");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    Comment.create(req.body.comment, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               blog.comments.push(comment);
               blog.save();
               console.log(comment);
               req.flash("success", "Successfully added comment!")
               res.redirect('/blog/' + blog._id);
                        }
                    })
                }
            });
        }
    });
    
    
});

//EDIT COMMENT ROUTE

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit-comment", {blog: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE COMMENT ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else{
            res.redirect("/blog/" + req.params.id)
        }
    });
});

//DELETE COMMENTS ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
           req.flash("success", "Comment deleted")
           res.redirect("/blog/"+ req.params.id);
       }
   }) 
});




module.exports = router;