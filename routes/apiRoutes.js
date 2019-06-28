var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/resume", function(req, res) {
  //   db.resume_db.findAll({}).then(function(dbresume_db) {
  //     res.json(dbresume_db);
  //   });
  // });

  // Create a new example
  app.post("/api/education", function(req, res) {
    db.Education.create(req.body).then(function(dbEducation) {
      res.json(dbEducation);
    });
  });

  app.post("/api/login", function(req, res) {
    db.Login.create(req.body).then(function(dbLogin) {
      res.json(dbLogin);
    });
  });

  app.post("/api/userinfo", function(req, res) {
    db.Userinfo.create(req.body).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  app.post("/api/workexp", function(req, res) {
    db.WorkExp.create(req.body).then(function(dbWorkExp) {
      res.json(dbWorkExp);
    });
  });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
