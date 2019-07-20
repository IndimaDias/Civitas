var db = require("../models");
var path = require("path");
var fs = require('fs');
var xml2js = require('xml2js').parseString;
const axios = require('axios'); 
var util = require("util");

const Op = db.Sequelize.Op


module.exports = function(app) {
  // Get all examples
  app.get("/api/userProfile", function(req, res) {
    db.User.findAll({}).then(function(dbProfile) {
      console.log("rest");
      res.json(dbProfile);
      // res.redirect("/public/profile");
    });
  });

  // Create a new example
  app.post("/api/userProfile", function(req, res) {
    
    // validate for existing usernames before inserting the record
    db.User.count({where : {userName : req.body.userName}})
    .then((count) => {
      if(count > 0) {
        // return error if username is already taken
        return res.status(500).send("Username already taken");
        
      }else {
        // save record
        db.User.create(req.body).then(function(dbProfile) {
         
          res.json(dbProfile);
        });
      }
    });

  });

  app.get("/api/userProfile/:userName", function(req, res) {
  //  select user stats from the table with the given user name 
    db.User.findOne({
      where:{
        userName : req.params.userName
      }
    }).then(function(dbProfile){

        res.json(dbProfile);
      
      });
    });

    app.get("/api/illness", function (req, res){      
      // find all users with the same illness and user name not euqual to the current user
      db.User.findAll({
        where:{
          illness : req.query.userIllness,
          userName : {[Op.ne] : req.query.userName}
        }
      }).then(function(dbProfile){        
        res.json(dbProfile);
      });
    });
    

    app.delete("/api/userProfile/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbProfile) {
      res.json(dbProfile);
    });
  });

  app.get("/api/about/:illness",function(req,res){
    console.log("Test");
    var xmlStr = ""; 

    

    axios.get('https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term='+req.params.illness)
      .then(response => {
        //   console.log(response.data)
        // xmlStr = response.data.;
        xml2js(response.data, function (err, result) {
            xmlStr = util.inspect(result.nlmSearchResult.list[0].document[0].$.url, false, null);

            console.log(xmlStr);
            res.send(xmlStr);
        });
       
      })
      .catch(error => {
        console.log(error);
      });

  });

};