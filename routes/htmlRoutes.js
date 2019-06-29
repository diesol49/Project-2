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

  // login page
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
        msg: "register your",
        example: result
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

// app.get("/login/:id", function(req, res) {
//   db.User.findOne({ where: { id: req.params.id } }).then(function(result) {
//     res.render("user", {
//       example: result
//     });
//   });
// });