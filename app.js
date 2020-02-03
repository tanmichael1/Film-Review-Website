//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const reviewTitle = "Default Title"
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const postSchema = {
  title: String,
  mins: String,
  year: String,
  director: String,
  actors: String,
  plot: String,
  reviewDate: String,
  review: String,
  postImg: String,
  feedImg: String
};

// Store:
// Film name
// Year
// director
// actors
//Plot
//Review Date
// REVIEW:
// Post Image
// Feed Image



app.get("/", function(req, res){
  res.render("home", {startingContent: homeStartingContent,
    title:reviewTitle
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/list", function(req, res){
  res.render("list");
});

app.get("/submit", function(req, res){
  res.render("submit");
});

app.get("/latest", function(req, res){
  res.render("latest");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/example", function(req, res){
  res.render("example", {filmTitle: "John Wick"});
});

app.get("/posts/:postID", function(req, res){
  const requestedPostId = req.params.postID;
  res.render(requestedPostId);
  console.log(requestedPostId);
});







app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
