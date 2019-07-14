var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.get("/user/profile/:userName", function(req, res) {
    console.log("Test");
    console.log(__dirname);
    console.log(path.resolve(__dirname, '../public/profile.html'));
    
    res.sendFile(path.resolve(__dirname, '../public/profile.html'));
    
    // res.redirect("/public/profile.html");
    // });
  });
// });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
};
