var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userProfile", function(req, res) {
    db.User.findAll({}).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  // Create a new example
  app.post("/api/userProfile", function(req, res) {
    console.log(req.body)
    db.User.create(req.body).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  // Delete an example by id
  app.delete("/api/userProfile/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });
};
