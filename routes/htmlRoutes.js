var db = require("../models");
var bcrypt = require("bcryptjs");
var passport = require("passport");
// var ensureAuthenticated = require("../config/auth");
// var forwardAuthenticated = require("../config/auth");

module.exports = function(app) {
  // Routes
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(result) {
      res.render("welcome", {
        msg: "Welcome!",
        examples: result
      });
    });
  });
  //'GET' routes
  // ---------------------------------------------------------
  // Login page
  app.get("/login", function(req, res) {
    db.User.findOne({ where: {} }).then(function(result) {
      res.render("login", {
        msg: "Welcome!",
        example: result
      });
    });
  });

  // Register page
  app.get("/register", function(req, res) {
    db.User.findOne({}).then(function(result) {
      res.render("register", {
        msg: "good to see you",
        example: result
      });
    });
  });

  // Dashboard page
  app.get("/dashboard/", function(req, res) {
    res.render("dashboard", {
      user: req.user
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  // ------------------------------------------------------

  //'Post' routes
  // Register handle
  app.post("/register", function(req, res) {
    var errors = [];

    // Check required fields
    if (
      !req.body.userName ||
      !req.body.userEmail ||
      !req.body.userPassword ||
      !req.body.userPassword2
    ) {
      errors.push({ msg: "Please fill in all fields" });
      console.log(errors[0]);
    }

    // Check passwords match
    if (req.body.userPassword !== req.body.userPassword2) {
      errors.push({ msg: "Passwords do not match" });
      console.log(errors[0]);
    }

    // Check password length
    if (req.body.userPassword.length < 6) {
      errors.push({ meg: "Password should be at least 6 charcters" });
      console.log(errors[0]);
    }

    if (errors.length > 0) {
      res.render("register", {
        errors: errors,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userPassword2: req.body.userPassword2
      });
    } else {
      // Validation passed
      var User = db.User;
      User.findOne({ where: { userEmail: req.body.userEmail } }).then(function(
        user
      ) {
        if (user) {
          // User exists
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors: errors,
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword,
            userPssword2: req.body.userPassword2
          });
        } else {
          var newUser = new User({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
          });

          // Hash Password
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.userPassword, salt, function(err, hash) {
              if (err) {
                console.log(err);
              }
              // Set password to hashed
              newUser.userPassword = hash;
              // Save user
              newUser
                .save()
                .then(function() {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/login");
                })
                .catch(function(err) {
                  console.log(err);
                });
            });
          });
        }
      });
    }
  });

  // Login
  app.post("/login", passport.authenticate("local"), function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect("/");
  });

  // Logout
  app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/login");
  });
};
