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
    },
    userEmail: {
      type: DataTypes.STRING
    }
  });

  User.associate = function(models) {
    User.belongsTo(models.Plants, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return User;
};
