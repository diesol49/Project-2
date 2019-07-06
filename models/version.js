module.exports = function(sequelize, Sequelize) {
  var Version = sequelize.define("Version", {
    resumeName: {
      type: Sequelize.STRING,
      notEmpty: true
    }
  });

  Version.associate = function(models) {
    // Associating Version with Posts
    // When an Version is deleted, also delete any associated Posts
    Version.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    }),
    Version.hasMany(models.Userinfo, {
      onDelete: "cascade"
    }),
      Version.hasMany(models.Education, {
        onDelete: "cascade"
      }),
      Version.hasMany(models.WorkExp, {
        onDelete: "cascade"
      });
  };

  return Version;
};
