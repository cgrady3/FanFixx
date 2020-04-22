require("dotenv").config();
var express = require("express");
var session = require("express-session");
var passport = require("./config/passport-config");
var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ----/
db.sequelize
  .query("SET FOREIGN_KEY_CHECKS = 0")
  .then(function() {
    return db.sequelize.sync(syncOptions);
  })
  .then(function() {
    return db.sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  })
  .then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });