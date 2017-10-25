var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// App Config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose / Model Config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Restful Routes
app.get("/", function(req, res){
  res.redirect("/blogs");
});

// INDEX Route
app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("ERROR!");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

// NEW Route
app.get("/blogs/new", function(req, res){
  res.render("new");
});

// CREATE Route
app.post("/blogs", function(req, res){
  // create blog
  Blog.create(req.body.blog, function(req, res){
    if(err){
      res.render("new");
    } else {
      // then, redirect to the index
      res.redirect("/blogs");
    }
  });
});

app.listen(process.env.PORT || 4000, process.env.IP, function(){
  console.log("Server is running");
})
