module.exports = function(sequelize, Sequelize) {
  var WorkExp = sequelize.define("WorkExp", {
    jobTitle: {
      type: Sequelize.STRING,
      defaultValue: !null
    },
    company: {
      type: Sequelize.STRING,
      defaultValue: !null
    },
    location: {
      type: Sequelize.STRING
    },
    dateOfEmployment: {
      type: Sequelize.STRING
    },
    jobDescription: {
      type: Sequelize.STRING
    }
  });

  WorkExp.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    WorkExp.belongsTo(models.Version, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return WorkExp;
};
