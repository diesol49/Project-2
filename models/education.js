module.exports = function(sequelize, Sequelize) {
  var Education = sequelize.define("Education", {
    schoolName: {
      type: Sequelize.STRING,
    },
    schoolLocation: {
      type: Sequelize.STRING,
    },
    degree: {
      type: Sequelize.STRING
    },
    fieldOfStudy: {
      type: Sequelize.STRING
    },
    gradDate: {
      type: Sequelize.STRING
    }
  });
  Education.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Education.belongsTo(models.Version, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Education;
};
