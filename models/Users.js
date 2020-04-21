var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 15],
        is: ["^[A-Za-z0-9_-]+$", "i"],
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8],
        is: ["^[a-z]+$", "i"],
      },
    },
  });

  Users.associate = function (models) {
    Users.hasMany(models.buttons, {
      onDelete: "cascade",
    });
  };

  Users.prototype.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  Users.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, 10);
  });

  return Users;
};
