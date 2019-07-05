var db = require("../models");

module.exports = function(app) {
  app.get("/api/userinfo", function(req, res) {
    var query = {};
    if (req.query.version_id) {
      query.VersionId = req.query.version_id;
    }
    db.Userinfo.findAll({
      where: query,
      include: [db.Version]
    }).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  // Get route for retrieving a single Userinfo
  app.get("/api/userinfo/:id", function(req, res) {
    db.Userinfo.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Version]
    }).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  // Userinfo route for saving a new Userinfo
  app.post("/api/userinfo", function(req, res) {
    db.Userinfo.create(req.body).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  // DELETE route for deleting userinfo
  app.delete("/api/userinfo/:id", function(req, res) {
    db.Userinfo.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  // PUT route for updating userinfo
  app.put("/api/userinfo", function(req, res) {
    db.Userinfo.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbUserinfo) {
      res.json(dbUserinfo);
    });
  });

  //education routes
  app.post("/api/education", function(req, res) {
    db.Education.create(req.body).then(function(dbEducation) {
      res.json(dbEducation);
    });
  });

  app.get("/api/education", function(req, res) {
    db.Education.create(req.body).then(function(dbEducation) {
      res.json(dbEducation);
    });
  });
  //workexp routes
  app.post("/api/workexp", function(req, res) {
    db.WorkExp.create(req.body).then(function(dbWorkExp) {
      res.json(dbWorkExp);
    });
  });

  app.get("/api/workexp", function(req, res) {
    db.WorkExp.create(req.body).then(function(dbWorkExp) {
      res.json(dbWorkExp);
    });
  });
};
