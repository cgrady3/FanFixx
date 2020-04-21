module.exports = function (sequelize, DataTypes) {
  var Query = sequelize.define("Query", {
    userQuery: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
        not: ["@"]
      },
    },
    twitter: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
        not: ["@"]
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn.clipart.email/4c2ef11c7e671bae0244a859318e1146_trading-clipart-4-clipart-station_1300-1390.jpeg",
    },
  });

  Query.associate = function (models) {
    Query.belongsTo(models.users, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: "cascade",
    });
  };

  return Query;
};
