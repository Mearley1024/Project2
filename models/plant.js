module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plants", {
    plantName: {
      type: DataTypes.STRING
    },
    plantPic: {
      type: DataTypes.STRING
    }
  });
  Plant.associate = function(models) {
    Plant.hasMany(models.Users, {
      onDelete: "cascade"
    });
  };
  return Plant;
};
