var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Get all examples
  app.get("/api/userProfile", function(req, res) {
    db.User.findAll({}).then(function(dbProfile) {
      console.log("rest");
      // res.json(dbProfile);
      res.redirect("/public/profile");
    });
  });

  // Create a new example
  app.post("/api/userProfile", function(req, res) {
    console.log(req.body)
    db.User.create(req.body).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  app.get("/api/userProfile/:userName", function(req, res) {
    db.User.findOne({
      where:{
        userName : req.params.userName
      }
    }).then(function(dbProfile){
      console.log("Test");
      console.log(__dirname);
      console.log(path.resolve(__dirname, '../public/profile.html'));
      // res.sendFile(path.resolve(__dirname, '../public/profile.html'));
      res.redirect("/profile");
    });
    
    
    
    
    // res.redirect("/public/profile.html");
    // });

// });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });
});
  // Delete an example by id
  app.delete("/api/userProfile/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });
};