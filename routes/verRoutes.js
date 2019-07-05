var db = require("../models");

module.exports = function(app) {
  app.get("/api/version", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    db.Version.findAll({
      include: [db.Userinfo]
    }).then(function(dbVersion) {
      res.json(dbVersion);
    });
  });

  app.get("/api/version/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Version.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Userinfo]
    }).then(function(dbVersion) {
      res.json(dbVersion);
    });
  });

  app.post("/api/version", function(req, res) {
    db.Version.create(req.body).then(function(dbVersion) {
      res.json(dbVersion);
    });
  });

  app.delete("/api/version/:id", function(req, res) {
    db.Version.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbVersion) {
      res.json(dbVersion);
    });
  });
};
