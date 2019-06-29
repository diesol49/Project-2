var db = require("../models");

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
  app.get("/register/", function(req, res) {
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
    if(!userName || !userEmail || !userPassword || !userPassword2) {
      errors.push({ msg: "Please fill in all fields"});
    }

    // Check passwords match
    if(userPassword !== userPassword2) {
      errors.push({ msg: "Passwords do not match"});
    }

    // Check password length
    if (userPassword.length < 6) {
      errors.push({ meg: "Password should be at least 6 charcters"});
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
      res.end("pass");
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
