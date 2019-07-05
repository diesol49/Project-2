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
  return Education;
};
