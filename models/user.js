module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userPass: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5 - 8]
      }
    }
  });
  return User;
};
