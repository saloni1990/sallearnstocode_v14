//MONGOOSE/MODEL CONFIG

var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
     title: String,
     date: String,
     image: String,
     post: String,
     category: String,
     author: {
          id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
          },
          username: String
     },
     comments: [
          {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Comment"
          }
     ]
});


module.exports = mongoose.model("Blog", blogSchema);