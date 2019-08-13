var Todo = require("../models/todo");
var passport = require("passport");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("todos");
});




module.exports = router;