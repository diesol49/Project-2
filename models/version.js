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
      Version.hasMany(models.Userinfo, {
        onDelete: "cascade"
      });
    };
  
    return Version;
  };