var db = require("../models");
var bcrypt = require("bcryptjs");

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
    res.render("dashboard");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
  // ------------------------------------------------------

  //'Post' routes
  // Register handle
  app.post("/register", function(req, res) {
    var { userName, userEmail, userPassword, userPassword2 } = req.body;
    var errors = [];

    // Check required fields
    if (!userName || !userEmail || !userPassword || !userPassword2) {
      errors.push({ msg: "Please fill in all fields" });
      console.log(errors[0]);
    }

    // Check passwords match
    if (userPassword !== userPassword2) {
      errors.push({ msg: "Passwords do not match" });
      console.log(errors[0]);
    }

    // Check password length
    if (userPassword.length < 6) {
      errors.push({ meg: "Password should be at least 6 charcters" });
      console.log(errors[0]);
    }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        userName,
        userEmail,
        userPassword,
        userPassword2
      });
    } else {
      // Validation passed
      const User = db.User
      User.findOne({ where: {userEmail: userEmail} }).then(function(user) {
        if (user) {
          // User exists
          errors.push({ msg: "Email is already registered" });
          res.render("register", {
            errors,
            userName,
            userEmail,
            userPassword,
            userPassword2
          });
        } else {
          const newUser = new User({
            userName,
            userEmail,
            userPassword
          });

          // Hash Password
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.userPassword, salt, function(err, hash) {
              if(err) throw err;
              // Set password to hashed
              newUser.userPassword = hash;
              // Save user
              newUser.save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
};

// app.get("/login/:id", function(req, res) {
//   db.User.findOne({ where: { id: req.params.id } }).then(function(result) {
//     res.render("user", {
//       example: result
//     });
//   });
// });
