var db = require("../models");

module.exports = function(app) {
  // Load home page
  app.get("/", function(req, res) {
    db.Plants.findAll({}).then(function(dbPlant) {
      res.render("index", {
        plantName: dbPlant
      });
    });
  });

  // Load survey page
  app.get("/survey", function(req, res) {
    db.Plants.findAll({}).then(function(dbPlant) {
      res.render("survey", {
        plantName: dbPlant
      });
    });
  });

  // Load specific user page
  app.get("/user/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Plants]
    }).then(function(dbUser) {
      res.render("user", {
        User: dbUser,
        Plant: dbUser.Plant
      });
      console.log(dbUser);
    });
  });

  // // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
