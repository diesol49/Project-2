var db = require("../models");

module.exports = function (app) {
  //Get all examples
  // app.get("/api/resume", function(req, res) {
  //   db.resume_db.findAll({}).then(function(dbresume_db) {
  //     res.json(dbresume_db);
  //   });
  // });

  app.get("/api/education", function (req, res) {
    res.json(education);
  });

  app.post("/api/education", function (req, res) {
    db.Education.create(req.body).then(function (dbEducation) {
      res.json(dbEducation);
    });
  });

  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/userinfo", function (req, res) {
    db.Userinfo.create(req.body).then(function (dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  app.post("/api/workexp", function (req, res) {
    db.WorkExp.create(req.body).then(function (dbWorkExp) {
      res.json(dbWorkExp);
    });
  });

  app.get("/api/education", function(req, res) {
    db.Education.create(req.body).then(function(dbEducation) {
      res.json(dbEducation);
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
