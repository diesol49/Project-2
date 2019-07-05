require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("passport");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
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
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

const syncOptions = { foce: false };

// Routes
var authRoute = require("./routes/auth")(app, passport);
//load passport strategies
require('./config/passport')(passport, db.user);

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.expoerts = app;

