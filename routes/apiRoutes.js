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

  // // Update plant with new user
  // app.post("/api/plants", function(req, res) {})
  //           // contains compatibility logic
  //           var bestMatch = {
  //             name: "",
  //             photo: "",
  //             matchSpread: 100
  //         };

  //         console.log(req.body);

  //         var newData = req.body;
  //         var newScores = newData.scores;

  //         console.log(newScores);

  //         var totalSpread = 0;

  //         for (var i = 0; i < friends.length; i++) {
  //             totalSpread = 0;
  //             for (var x = 0; x < friends[i].scores[x]; x++) {
  //                 totalSpread += Math.abs(parseInt(newScores[x]) - parseInt(friends[i].scores[x]));

  //             if (totalSpread <= bestMatch.matchSpread) {
  //                 bestMatch.name = friends[i].name;
  //                 bestMatch.photo = friends[i].photo;
  //                 bestMatch.matchSpread = totalSpread;
  //             }
  //             }
  //         }

  //         friends.push(newData);

  //         res.json(bestMatch);

  // });
  // compatibility end

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
