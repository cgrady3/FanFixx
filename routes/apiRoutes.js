var db = require("../models");
var bcrypt = require("bcryptjs");
var cheerio = require("cheerio");
var axios = require("axios");
const passport = require("../config/passport-config");

module.exports = function (app) {
  //Find all users. TODO: Don't let this grab passwords before production.
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // find all tweets
  app.get("/api/tweets", function (req, res) {
    db.Tweet.findAll({}).then(function (dbTweet) {
      res.json(dbTweet);
    });
  });

  // only allow logged in users to view a user profile
  app.post("/users", passport.authenticate("local-user"), function (req, res) {
    var user = req.user;
    res.json(user);
    console.log(req.user);
  });

  // user login
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );

  // register a user
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/register",
    })
  );

  // post a searched player/team
  app.post("/api/query", function (req, res) {
    db.Query.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  app.get("/api/query", function (req, res) {
    db.Query.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  // Get all of users saved players/teams
  app.get("/api/query/user/:userid", function (req, res) {
    db.Query.findAll({
      where: {
        UserId: req.params.userid,
      },
    }).then(function (data) {
      res.json(data);
    });
  });

  //Get a specific player/team by ID.
  app.get("/api/query/:id", function (req, res) {
    db.Query.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (data) {
      res.json(data);
    });
  });

  //Delete a player/team
  app.delete("/api/query/:id", function (req, res) {
    db.Query.destroy({
      where: { id: req.params.id },
    }).then(function (data) {
      res.json(data);
    });
  });

  // twitter scrape
  app.get("/api/scrape/:handle/:id", function (req, res) {
    console.log("handle: " + req.params.handle)
    let id = req.params.id;
    axios
      .get("https://twitter.com/" + req.params.handle)
      .then(function (response) {
        
        var $ = cheerio.load(response.data);
        $("li.stream-item").each(function (index) {
          var tweet = $(this).find("p.tweet-text").text();
          var fullTweet = $(this).find("p.tweet-text").text();

          var splitTweet = fullTweet.split("https://");
          var nottweet = splitTweet[0];
          var link = splitTweet[1];
          var pic = "";
          var time = $(this).find("time").text();
          db.Tweet.create({
            tweet: tweet,
            picture: pic,
            time: link,
            QueryId: id,
          })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => console.log(err));
        });

        res.json("scrape complete");
      });
  });

  // get tweets of player/team
  app.get("/api/twitter/:id", function (req, res) {
    db.Tweet.findAll({ where: { QueryId: req.params.id } }).then(function (
      data
    ) {
      res.json(data);
    });
  });

  // clear tweets from database
  app.delete("/api/twitter/:id", function (req, res) {
    db.Tweet.destroy({
      where: { QueryId: req.params.id }
    }).then(function (data) {
      res.json(data);
    });
  });
};
