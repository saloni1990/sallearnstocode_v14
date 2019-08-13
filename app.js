var express          = require("express"),
    app              = express(),
    path             = require("path"),
    cors             = require("cors"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    expressSanitizer = require ("express-sanitizer"),
    Blog             = require("./models/blog"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    todoRoute        = require("./models/todo"),  
    seedDB           = require("./seeds");
    
    var todoRoute = require("./routes/todo"),
        commentsRoute = require("./routes/comments"),
        blogRoute = require("./routes/blog"),
        landingRoute = require("./routes/landing")



//APP CONFIG    
var url = process.env.DATABASEURL || "mongodb://localhost/sal_learns_to_code_v10";
// mongoose.connect(url).then( () =>{
//     console.log('Database connection is succesfull')
// }, 
// err => {console.log('Erroe when connecting to the database' + err)}
// );

// mongoose.connect("mongodb://localhost/sal_learns_to_code_v10");
// mongoose.connect("process.env.DATABASEURL");
mongoose.connect("mongodb://Saloni:Chaggers2104@ds247699.mlab.com:47699/sallearnstocode");
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(cors());
//seed the database
// seedDB();
//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "sal learns to code",
    resave: false,
    saveUninitialized: false
})),


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/todos", todoRoute);
app.use("/blog/:id/comments",commentsRoute);
app.use("/blog", blogRoute); 
app.use("/", landingRoute); 

app.listen(process.env.PORT || 3000, process.env.IP, function(){
    console.log("Server Has Started");
 });

// app.listen(3000, function(){
//     console.log("Server is running");
// });

