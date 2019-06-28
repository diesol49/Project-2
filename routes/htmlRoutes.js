var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Login.findAll({}).then(function(result) {
      res.render("index", {
        msg: "Welcome!",
        examples: result
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/login/:id", function(req, res) {
    db.Login.findOne({ where: { id: req.params.id } }).then(function(result) {
      res.render("example", {
        example: result
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
