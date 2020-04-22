module.exports = function (sequelize, DataTypes) {
    var Tweet = sequelize.define("Tweet", {
      tweet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    Tweet.associate = function (models) {
      Tweet.belongsTo(models.Query, {
        foreignKey: {
          allowNull: false,
        },
        onDelete: "cascade",
      });
    };
  
    return Tweet;
  };