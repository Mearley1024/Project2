var db = require("../models");

module.exports = function(app) {
  // Get all plants
  app.get("/api/plants", function(req, res) {
    db.Plants.findAll({
      include: [db.Users]
    }).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  // Get plant by score
  app.get("/api/plants/:score", function(req, res) {
    db.Plants.findOne({
      where: {
        score: req.params.score
      }
    }).then(function(dbPlant) {
      console.log(dbPlant);
      res.json(dbPlant);
    });
  });

  // Get all users
  app.get("/api/users", function(req, res) {
    db.Users.findAll({
      include: [db.Plants]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/users", function(req) {
    console.log(req.body);
    db.Users.create({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPass: req.body.userPass,
      score: req.body.score,
      PlantId: req.body.plantId
    });
  });

  // Get one user by userName and userPass
  app.get("/api/users/:name/:pass", function(req, res) {
    db.Users.findOne({
      where: {
        userName: req.params.name,
        userPass: req.params.pass
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new user
  app.post("/api/user/:id", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
