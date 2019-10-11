module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plants", {
    plantName: {
      type: DataTypes.STRING
    },
    plantPic: {
      type: DataTypes.STRING
    },
    plantType: {
      type: DataTypes.STRING
    },
    soil: {
      type: DataTypes.TEXT
    },
    hardiness: {
      type: DataTypes.TEXT
    },
    water: {
      type: DataTypes.TEXT
    },
    sun: {
      type: DataTypes.TEXT
    },
    score: {
      type: DataTypes.TEXT
    }
  });
  Plant.associate = function(models) {
    Plant.hasMany(models.Users, {
      onDelete: "cascade"
    });
  };
  return Plant;
};
