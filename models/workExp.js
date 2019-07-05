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
  return WorkExp;
};
