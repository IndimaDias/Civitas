var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // db.Users.findAll({}).then(function(dbUsers) {
    res.sendFile(path.join(__dirname, "../views/index.html"));
    // });
  });

  app.get("/user/profile", function(req, res) {
    // db.Users.findAll({}).then(function(dbUsers) {
    res.sendFile(path.join(__dirname, "../views/profile.html"));
    // });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
