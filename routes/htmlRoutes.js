var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Plants.findAll({}).then(function(dbPlant) {
      res.render("index", {
        plantName: dbPlant
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/survey", function(req, res) {
    db.Plants.findAll({}).then(function(dbPlant) {
      res.render("survey", {
        plantName: dbPlant
      });
    });
  });

  app.get("/user", function(req, res) {
    db.Users.findAll({}).then(function(dbUser) {
      res.render("user", {
        userName: dbUser
      });
    });
  });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
