var db = require("../models");

module.exports = function(app) {
  // Get all plants
  app.get("/api/plants", function(req, res) {
    db.Plants.findAll({}).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  // Update user with new plant

  // Get all users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/users/:id", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
