var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Comment = require("./models/comment");
var User = require("./models/user");

var data = [
    
    {
        title: "First Hour in Japan",
        image: "http://www.fastnews.lk/wp-content/uploads/2016/08/Narita.jpg",
        map:   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d414518.8050624392!2d139.8004036!3d35.7402796!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x6022f379d1bd3757%3A0xd56e29a162771aa1!2sNarita+International+Airport%2C+Furugome%2C+Narita%2C+Chiba+Prefecture%2C+Japan!3m2!1d35.7719867!2d140.3928501!4m5!1s0x60188be21452f5a7%3A0xc36c67d46fd4508a!2zSmFwYW4sIOOAkjEwNC0wMDMxIFTFjWt5xY0tdG8sIENoxavFjS1rdSwgS3nFjWJhc2hpLCAyIENob21l4oiSMTMsIOS4reWkruWMuuS6rOapi--8kuS4geebru-8ke-8k-KIkjEx5YWIIFRha2FyYWNobyBTdGEu!3m2!1d35.6757214!2d139.7720535!5e0!3m2!1sen!2suk!4v1532884798028",
        post: "I wanted to start looking up train stations near our hotel and I think the most important thing you can do when travelling anywhere is know where you are going to be staying when you get to yoru destination. When you land, especially after a long flight to Japan, all you want to do is drop your luggage and freshen up which is why I always make a note of ",
        
    },
    
    {
        title: "Cloud's rest",
        image: "https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        map:   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d414518.8050624392!2d139.8004036!3d35.7402796!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x6022f379d1bd3757%3A0xd56e29a162771aa1!2sNarita+International+Airport%2C+Furugome%2C+Narita%2C+Chiba+Prefecture%2C+Japan!3m2!1d35.7719867!2d140.3928501!4m5!1s0x60188be21452f5a7%3A0xc36c67d46fd4508a!2zSmFwYW4sIOOAkjEwNC0wMDMxIFTFjWt5xY0tdG8sIENoxavFjS1rdSwgS3nFjWJhc2hpLCAyIENob21l4oiSMTMsIOS4reWkruWMuuS6rOapi--8kuS4geebru-8ke-8k-KIkjEx5YWIIFRha2FyYWNobyBTdGEu!3m2!1d35.6757214!2d139.7720535!5e0!3m2!1sen!2suk!4v1532884798028",
        post: "blahahdaohafhaofhaofh",
        
    },
    
    {
        title: "Cloud's rest",
        image: "https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        map:   "https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d414518.8050624392!2d139.8004036!3d35.7402796!3m2!1i1024!2i768!4f13.1!4m13!3e3!4m5!1s0x6022f379d1bd3757%3A0xd56e29a162771aa1!2sNarita+International+Airport%2C+Furugome%2C+Narita%2C+Chiba+Prefecture%2C+Japan!3m2!1d35.7719867!2d140.3928501!4m5!1s0x60188be21452f5a7%3A0xc36c67d46fd4508a!2zSmFwYW4sIOOAkjEwNC0wMDMxIFTFjWt5xY0tdG8sIENoxavFjS1rdSwgS3nFjWJhc2hpLCAyIENob21l4oiSMTMsIOS4reWkruWMuuS6rOapi--8kuS4geebru-8ke-8k-KIkjEx5YWIIFRha2FyYWNobyBTdGEu!3m2!1d35.6757214!2d139.7720535!5e0!3m2!1sen!2suk!4v1532884798028",
        post: "blahahdaohafhaofhaofh"
    }
    ];

function seedDB(){
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed posts");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            data.forEach(function(seed){
                Blog.create(seed, function(err, blog){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added blog!");
                        Comment.create(
                            {
                            text: "This post is great!",
                            author: "Saloni"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    blog.comments.push(comment);
                                    blog.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;