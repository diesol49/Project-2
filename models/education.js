module.exports = function(sequelize, DataTypes) {
  var Education = sequelize.define("Education", {
    schoolName: {
      type: DataTypes.STRING,
    },
    schoolLocation: {
      type: DataTypes.STRING,
    },
    degree: {
      type: DataTypes.STRING
    },
    fieldOfStudy: {
      type: DataTypes.STRING
    },
    gradDate: {
      type: DataTypes.STRING
    }
  });
  return Education;
};
