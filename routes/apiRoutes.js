var db = require("../models");
var bcrypt = require("bcryptjs");
const passport = require("../config/passport-config");

module.exports = function (app) {
  //Find all users. TODO: Don't let this grab passwords before production.
  app.get("/api/users", function (req, res) {
    db.users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
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
      successRedirect: "/users",
      failureRedirect: "/login",
    })
  );

  // register a user
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/users",
      failureRedirect: "/register",
    })
  );

  // post a searched player/team
  app.post("/api/query", function (req, res) {
    db.Query.create(req.body).then(function (data) {
      res.json(data);
    });
  });

  // Get all of users saved players/teams
  app.get("/api/query/user/:userid", function (req, res) {
    db.Query.findAll({
      where: {
        userId: req.params.userid,
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

  // scrape setup
  var cheerio = require("cheerio");
  var axios = require("axios");
  // twitter scrape
  app.get("/api/twitter/:handle", function (req, res) {
    axios
      .get("https://twitter.com/" + req.params.handle)
      .then(function (response) {
        var $ = cheerio.load(response.data);
        var data = [];
        $("table.tweet").each(function (i, element) {
          // In the currently selected element, look at its child elements (i.e., its a-tags),
          // then save the values for any "href" attributes that the child elements may have
          let tweet = $(element).children().attr("div.tweet-text");
          let picText = $(element)
            .children()
            .attr("span.metadata")
            .children()
            .attr("a")
            .text();
          let pic;
          if (picText === "View photo") {
            let pic = $(element)
              .children()
              .attr("span.metadata")
              .children()
              .attr("href");
          }

          var response = {
            title: title,
            link: link,
            pic: pic,
          };
          data.push(response)
        });
      });
    res.json(data);
  });
};
