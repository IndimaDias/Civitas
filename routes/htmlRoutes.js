var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    // });
  });

  app.get("/profile", function(req, res) {
  //   // db.Users.findAll({}).then(function(dbUsers) {
  //     console.log("test");
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  //   // });
  });

  app.get("/email", function(req, res) {
    console.log("emal2");
    res.sendFile(path.join(__dirname, "../public/email.html"));
});
  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });


  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
