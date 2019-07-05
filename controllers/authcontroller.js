var exports = (module.exports = {});
var bcrypt = require("bcryptjs");
var db = require("../models")

exports.welcome = function(req, res) {
  res.render("welcome");
};
exports.signup = function(req, res) {
  res.render("signup");
};
exports.signin = function(req, res) {
  res.render("signin");
};

exports.dashboard = function(req, res) {
  res.render("dashboard");
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};

exports.validate = function(req, res) {
  var errors = [];

  // Check required fields
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.password2
  ) {
    errors.push({ msg: "Please fill in all fields" });
    console.log(errors[0]);
  }

  // Check passwords match
  if (req.body.password !== req.body.password2) {
    errors.push({ msg: "Passwords do not match" });
    console.log(errors[0]);
  }

  // Check password length
  if (req.body.password.length < 6) {
    errors.push({ meg: "Password should be at least 6 charcters" });
    console.log(errors[0]);
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors: errors,
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    
      var User = db.user;

      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      User.findOne({ where: { email: email } })
        .then(function(user) {
          if (!user) {
            return done(null, false, { message: "Email does not exist" });
          }

          if (!isValidPassword(user.password, password)) {
            return done(null, false, { message: "Incorrect password." });
          }

          var userinfo = user.get();

          return done(null, userinfo);
        })
        .catch(function(err) {
          console.log("Error:", err);

          return done(null, false, {
            message: "Something went wrong with your Signin"
          });
        });
    
  }
};
