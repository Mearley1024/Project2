module.exports = function(sequelize, DataTypes) {
  var Plant = sequelize.define("Plants", {
    plantName: DataTypes.STRING
  });
  return Plant;
};
