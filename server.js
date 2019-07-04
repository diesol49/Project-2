require("dotenv").config();

var express = require("express");
var exphbs = require("express-handlebars");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Passport Config
require("./config/passport")(passport);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
//connect flash
app.use(flash());

//global vars
app.use(function(req, res, next) {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("successMsg");
  res.locals.error = req.flash("error");
  next();
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
