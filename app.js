//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const reviewTitle = "Default Title"
const aboutContent = "Welcome to my Movie Blog. My name is Michael, and I'm the founder, CEO, and the movie critic behind this blog.";
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(express.static("images"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const postSchema = {
  title: {
    type: String,
    required: [true, "Film name required"]
  },
  mins: Number,
  year: Number,
  genres: [String],
  director: String,
  actors: [String],
  plot: String,
  reviewDate: Date,
  review: [String],
  rating: {
    type: Number,
    min: [1, "Choose a rating between 1 and 10"],
    max: [10, "Choose a rating between 1 and 10"]
  },
  postImg: String,
  feedImg: String
};

const Post = mongoose.model("Post", postSchema);

const johnWick = new Post({
  title: "John Wick",
  mins: 101,
  year: 2014,
  genres: ["Action", "Crime", "Thriller"],
  director: "Chad Stahelski, David Leitch",
  actors: ["Keanu Reeves", "Michael Nyqvist", "Alfie Allen", "Willem Dafoe"],
  plot: "After the sudden death of his beloved wife, John Wick (Keanu Reeves) receives one last gift from her, a beagle puppy named Daisy, and a note imploring him not to forget how to love. But John’s mourning is interrupted when his 1969 Boss Mustang catches the eye of sadistic thug Iosef Tarasov (Alfie Allen) who breaks into his house and steals it, beating John unconscious and leaving Daisy dead. Unwittingly, they have just reawakened one of the most brutal assassins the underworld has ever seen.",
  reviewDate: "2017-03-07",
  review: ["With the sequel coming sometime soon, I thought I should give my thoughts on the original John Wick. John Wick was one of the most surprising movies of 2014. It wasn’t just a standard Keanu Reeves action flick, it was actually something special, garnering a strong reception and following. It is an entertaining and thrilling action movie.",

    "The story really isn’t anything special. It’s a revenge story, just with the main character being a former hitman. It’s the execution of the story that makes this movie work so well. The story is set out well, the pace never feeling too fast or too long. The world of John Wick is one of the stand out parts of the movie (which is saying a lot). The world is absolutely incredible and interesting, laid out well. I can’t wait to see how the sequel explores this world. This movie is engaging and riveting, it really never lost my attention once.",

    "This is the best Keanu Reeves has ever been in a movie (it’s also probably the best movie that Keanu Reeves has ever been in). He is really is believable in this role, and not just in the action scenes, he does actually act well in this movie, he’s not just playing Keanu Reeves like he has in certain other movies. It really does help that Keanu Reeves does his own stunts, it is much easier to buy him as this character. The supporting performances were also great. Michael Nyqvust was quite effective as the main villain as Iosef’s father (and a mob boss), completely owning every scene he’s in. Also, Willem Dafoe, Alfie Allen, Ian McShane and even John Leguizamo were good in their roles (however I would’ve liked if we saw more of Willem Dafoe).",

    "The action is absolutely fantastic. It doesn’t have a lot of shaky cam or unnecessary quick cuts like most action movies nowadays have. The stunt work was also fantastic (it helps with both directors being stunt men), the fights are intense and don’t feel fake at all. Another thing I liked was that although John Wick is incredibly good at what he does, he’s still human, he doesn’t always win perfectly against people just because he’s John Wick. That makes the action a lot more riveting, he’s not just Arnold Schwarzenegger in Commando or something. In terms of the standout action scene, there’s a sequence that takes place in a nightclub (which reminded me of the nightclub scene in Collateral). In terms of flaws, I guess maybe the last action sequence was slightly underwhelming but that’s probably because everything else in the film was so great that it just paled in comparison.",

    "John Wick has a fantastic world, solid performances, entertaining action, everything you want from an action movie. As I said, the concept of the story itself is nothing special, it’s the execution that makes this film so excellent. If you haven’t already, definitely see John Wick when you can, especially before seeing the sequel which comes out (or already came out depending where you are in the world)."
  ],

  rating: 9,
  postImg: "https://images-na.ssl-images-amazon.com/images/G/01/digital/video/hero/Movies/2014/JohnWick_152500700_1810080-219613._V331809634_SX1080_.jpg",
  feedImg: "https://thecinemacritic.files.wordpress.com/2017/03/jw_11934_r-51.jpg"

});



const halloween = new Post({
  title: "Halloween",
  mins: 91,
  year: 1978,
  genres: ["Horror", "Thriller"],
  director: "John Carpenter",
  actors: ["Donald Pleasence", "Jamie Lee Curtis", "Nick Castle", "P.J. Soles", "Nancy Kyes"],
  plot: "On a cold Halloween night in 1963, six year old Michael Myers brutally murdered his 17-year-old sister, Judith. He was sentenced and locked away for 15 years. But on October 30, 1978, while being transferred for a court date, a 21-year-old Michael Myers steals a car and escapes Smith’s Grove. He returns to his quiet hometown of Haddonfield, Illinois, where he looks for his next victims.",
  reviewDate: "2018-09-24",
  review: ["With the latest Halloween movie coming out less than a month away, I decided to have another look back at John Carpenter’s horror classic, Halloween. Halloween was revolutionary for film, especially for the horror genre. Even with a smaller budget and a simple premise, they really caught lighting in a bottle with this.",

    "Getting some of the worse elements of the movie out of the way, some of the dialogue can be really bad, especially when it comes to the teenage characters, it’s like someone is badly trying to imitate teenagers from the 70s. With that said it’s a minor issue. The film does also set all of these characters up to be one dimensional bags of blood to be stabbed by the masked killer, something that other slasher movies following it would be doing as well. Since it was the first to do it I guess I don’t have too much to complain about. A lot of the clichés and tropes that would happen would be because of this movie, for better or for worse. No, Halloween wasn’t the first slasher film to be made. It was however one of the first slasher movies to introduce the idea of a killer coming to a familiar location instead of going to a place where the killer is (like Psycho or Texas Chainsaw Massacre). Halloween is about an hour and 30 minutes long and that was the right length, it doesn’t drag and even in the scenes where nothing much is happening, Michael Myer’s presence will usually be felt during it. Halloween is quite a simple movie, with a limited amount of locations, a simple premise, a straightforward killer, yet all of it works, it’s simplicity is the key to its success. The portrayal of Michael Myers is really effective. The only bit of backstory that we get about him is from Sam Loomis (Donald Pleasence) who describes him as being pretty much pure evil and you completely buy it. Making it even more intimidating is how Myers seems absolutely unstoppable. He doesn’t run when chasing after people and when he kills he’s not over the top with it, he walks slow, he kills silently, the only sounds from him are his deep breaths. From what I understand the sequels and the remakes try to make an explanation for him, however while they might be able to explain why he acts how he does (which does take away from him as a character), nothing can really explain his immortality. I much prefer the pure evil explanation for him.",

    "Donald Pleasence is fantastic as Sam Loomis, the doctor who is the only person who truly knows how dangerous Michael Myers is. True there’s not much to the character but it’s by far the best performance in this movie. Jamie Lee Curtis makes her debut acting performance here as Laurie Strode and she does pretty okay in her role, nothing great but nothing bad either. It’s worth keeping in mind that she essentially became the first “last survivor” character in a slasher film, so a lot of the tropes with that sort of characters started with her character. She’s at least better than most of the other actors. Most of the actors are pretty bad, especially the teenage characters.",

    "John Carpenter’s direction was one of the main reasons why Halloween works so well. Halloween has a budget of about $300,000, which even then in the 70s was pretty low and yet he did so much with that budget. Sometimes you can feel some of the restraints with the regard to things like the sound design is not always the greatest but most of it is fine. Something about how small scale it feels really adds to this movie, you feel much more confined to what is going on. The cinematography is absolutely masterful, the use of wideshots was really effective, especially for building tension and suspense. Carpenter made Michael Myers a real presence throughout the movie, even when he isn’t killing anyone. In fact, him just standing somewhere in the background is really effective, way more effective than just him killing people. The kills are actually pretty tame for a slasher film but they are pretty effective. They aren’t overly bloody or gory and are usually somewhat in the shadows, fitting in with the rest of the movie and not being a typical bloodfest (which the movies would eventually become). The cinematography is only made better with the use of John Carpenter’s score, which is absolutely excellent. I don’t think Halloween would have been as iconic or effective without the score. Every time that main theme comes on, you are just wondering what’s going on, whether Michael Myers is there or what’s happening next, and only continues to build tension and really sets the mood. The design of Michael Myers is simple but effective. A William Shatner mask and a jumpsuit is all there is to his physical appearance and yet it remains one of the most iconic horror costume designs ever 40 years later. As for the scares, most of them didn’t affect me but that’s just me, I’m difficult to be scared. It does have some jump scares but all of them are effective, it’s not cheap at all and even the fake out jump scares are pretty effective.",

    "Halloween is still a horror classic to this day and it’s easy to see why looking back at it. John Carpenter’s direction of this simple premise was really effective and led to a huge change for the horror genre (for better and for worse). It’s actually the only movie in the long series that I’ve watched but I can’t imagine any of the sequels being even close to living up to the original. The sequel coming this year will be ignoring all other sequels and it looks like it will at least somewhat close to being at the level of the original, which is saying a lot considering how great the original is. 40 years on, John Carpenter’s Halloween still remains a classic."
  ],

  rating: 9,
  postImg: "https://thecinemacritic.files.wordpress.com/2018/09/halloween-_-la-nuit-des-masques_465497_309921.jpg",
  feedImg: "https://thecinemacritic.files.wordpress.com/2018/09/halloween_1978_still1.jpg"

});

const dredd = new Post({
  title: "Dredd",
  mins: 95,
  year: 2012,
  genres: ["Action", "Crime", "Sci-Fi"],
  director: "Pete Travis",
  actors: ["Karl Urban", "Olivia Thirlby", "Lena Headey", "Wood Harris"],
  plot: "Mega City One is a vast, violent metropolis where felons rule the streets. The only law lies with cops called “judges,” who act as judge, jury and executioner, and Dredd (Karl Urban) is one of the city’s most feared. One day, Dredd is partnered with Cassandra (Olivia Thirlby), a rookie with powerful psychic abilities. A report of a terrible crime sends Dredd and Cassandra to a dangerous area controlled by Ma-Ma (Lena Headey), a drug lord who will stop at nothing to protect her empire.",
  reviewDate: "2017-08-11",
  review: ["Dredd had a lot of potential to fail. There had been a Judge Dredd movie with Sylvester Stallone in the mid 90s, which while enjoyable as a guilty pleasure, isn’t very good. Dredd was a surprise to many including myself, it had all the elements of a very solid action flick fun time, and from what I can tell its an accurate representation of Judge Dredd. One of the most underrated action movies in recent years.",

    "This movie is very straightforward, it’s just our main characters going from room to room while hoards of enemies hunt for them. Now I’m not a Judge Dredd comics fan but I could tell that the original Judge Dredd was more of a Sylvester Stallone action flick than an actual Judge Dredd movie. Dredd is truly a Judge Dredd film. The world is really nicely realised, it is a grim and dark world, the R rating really helped the movie go deeper into it. I was entertained throughout, from the set up at the beginning to when the film actually kicks off, which is when our protagonists are actually facing endless amounts of people trying to kill them and it doesn’t let up. There isn’t anything wrong about the film that I could pinpoint, it has great protagonists, a threatening antagonist and an interesting world, everything that Dredd needed.",

    "Karl Urban is Judge Dredd, that’s all I can really say. He is ruthless, badass and unrelenting, and no, at no point do you see him without his mask. This movie really isn’t a character study or anything like that, so don’t expect a lot of character depth with his version of Judge Dredd, but it worked very well for the movie as it was a straightforward action movie. Olivia Thirlby is also really good as a rookie judge with Dredd, who does have psychic powers, those two worked together well as our main characters. Lena Headey makes for a great villain, ruthless, sinister and brutal, she stole every scene she was in. Also the way she plays the role and reacted to certain situations made her have such a strong screen presence.",

    "Dredd surprisingly only has a 30-45 million dollar budget, making it a much smaller film than you’d expect. However that budget was used well because this film is directly greatly. The action is great, it is very violent and pretty much how I would imagine a Judge Dredd film would be. This film also involves slow-mo, and they find a way to make slow-mo actually make sense, as there is a drug literally called slow-mo that slows down the brain of whoever takes it and it was portrayed so well on screen. The R-rating is not always necessary but sometimes it is really needed to fully make the movie they want. This is one of those cases. The film is brutal and dark, definitely far from the Stallone cheesefest from the 90s, and I loved it.",

    "I thoroughly enjoyed Dredd, the actors were great in their roles, the action is good. This film isn’t revolutionary, I don’t think I’d consider it one of the best action films of the 2010s, but for what it was trying to be it succeeded very well. I have no idea if they are making a Dredd sequel but I’d love to see one, I wanna see more of the world that they portrayed."
  ],

  rating: 9,
  postImg: "https://thecinemacritic.files.wordpress.com/2017/08/dredd1-2.jpg",
  feedImg: "https://thecinemacritic.files.wordpress.com/2017/08/7y1l6m_mgbjve1.jpg"

});

// Post.insertMany(dredd, function(err, posts){
//   if(err){
//     console.log(err);
//   }
//
//   else{
//     console.log("Successfully saved all the posts to postsDB");
//   }
// });

//post.save();

// Post.insertMany([johnWick, halloween], function(err, posts){
//   if(err){
//     console.log(err);
//   }
//
//   else{
//     console.log("Successfully saved all the posts to postsDB");
//   }
// });

// Post.deleteOne({title:"Halloween"}, function(err){
//   if(err){
//     console.log(err);
//   }
//
//   else{
//     console.log("Deleting successful");
//   }
// });

Post.find(function(err, posts) {
  if (err) {
    console.log(err);
  } else {
    console.log(posts);
  }
});

app.use(express.static("images"));

app.use(express.static('/public/images'));

app.get("/", function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        title: reviewTitle,
        posts: posts.sort(function(a, b) {
          if(a.reviewDate.getYear() < b.reviewDate.getYear()){
            return -1
          }

          if(a.reviewDate.getYear() > b.reviewDate.getYear()){
            return -1
          }

          if(a.reviewDate.getYear() === b.reviewDate.getYear()){
            if(a.reviewDate.getMonth() > b.reviewDate.getMonth()){
              return 1
            }
            if(a.reviewDate.getMonth() < b.reviewDate.getMonth()){
              return -1
            }

            if(a.reviewDate.getMonth() === b.reviewDate.getMonth()){
              if(a.reviewDate.getDay() > b.reviewDate.getDay()){
                return 1
              }

              if(a.reviewDate.getDay() < b.reviewDate.getDay()){
                return 1
              }

              return 0;
            }
          }
        })
      });

    }
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/test", function(req, res) {
  res.render("test");
});

app.get("/test2", function(req, res) {
  res.render("test2");
});

app.get("/list", function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        posts: posts.sort(function(a, b) {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        })
      });
    }
  });
});

app.get("/search", function(req, res){
  res.render("search", req.body.search);

});



app.get("/latest", function(req, res) {
  Post.find(function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("latest", {
        posts: posts.sort(function(a, b) {
          return a.reviewDate - b.reviewDate
        }).reverse()
      });
    }
  });

});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/example", function(req, res) {
  res.render("example", {
    filmTitle: "John Wick"
  });
});

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + ' ' + time;

app.get("/submit", function(req, res) {
  res.render("submit", {
    date: new Date().toLocaleDateString()
  });
});

app.post("/submit", function(req, res) {
  var cast = req.body.actors;
  var stringCast = cast.split(",")
  var castArr = [cast];
  var genres = req.body.genres;
  var stringGenres = genres.split(",");
  var reviewTest = req.body.review;
  var newstr="";
  var reviewArray = [];

  for(var i=0; i<reviewTest.length; i++){
    if(!( reviewTest[i]=='\n' || reviewTest[i] =='\r')){
      newstr += reviewTest[i];
    }
    if(reviewTest[i] =='\r'){
      console.log("here");
      console.log(reviewTest[i]);
      reviewArray.push(newstr);
      newstr="";
    }
  }


  const post = new Post({
    title: req.body.postTitle,
    mins: req.body.mins,
    year: req.body.year,
    genres: stringGenres,
    director: req.body.director,
    actors: stringCast,
    plot: req.body.plot,
    reviewDate: req.body.reviewDate,
    review: reviewArray,
    rating: req.body.rating,
    postImg: req.body.postImg,
    feedImg: req.body.feedImg
  });
  console.log("START");
  console.log(cast);
  console.log(stringCast);
  console.log(reviewArray);
  console.log("Date" + req.body.reviewDate);

  console.log(post);
  // post.save(function(err) {
  //   if (!err) {
  //     res.redirect("home");
  //   }
  // });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

// app.post("/submit", function(req, res){
//   console.log(req.body);
//   const post = {
//
//   }
//
//   posts.push(post);
//
//
//   res.redirect("/latest", posts);
//
//
// })


app.get("/posts/:postName", function(req, res) {
  var requestedPostId = req.params.postName;
  console.log("requestedPostId is " + requestedPostId);
  Post.findOne({
    _id: requestedPostId
  }, function(err, foundPost) {
    console.log(foundPost);
    if (err) {
      console.log(err);
    } else {
      if (foundPost) {
        console.log("found");
        res.render("post", {
          post: foundPost
        });
      } else {
        console.log("Cannot find post");
      }
    }
  });


});





// app.get("/posts/:postID", function(req, res) {
//   const requestedPostId = req.params.postID;
//   console.log(requestedPostId);
//   Post.findOne({_id: requestedPostId}, function(err, foundPost){
//     console.log(foundPost);
//     if(err){
//       console.log(err);
//     }
//
//     else{
//       if(foundPost){
//         console.log("found");
//         res.render("post", {post: foundPost});
//       }
//
//       else{
//         console.log("Cannot find post");
//       }
//     }
//   });
//
//
// });

//     app.get("/posts/:postID", function(req, res){
//
// const requestedPostId = req.params.postId;
// console.log("requestedPostId: " + requestedPostId);
//
//   Post.findOne({_id: requestedPostId}, function(err, post){
//     if(err){
//           console.log(err);
//         }
//     console.log("Post: " + post);
//     res.render("post", { post:post
//     });
//   });
//
// });


app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
