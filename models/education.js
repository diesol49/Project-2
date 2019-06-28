module.exports = function(sequelize, DataTypes) {
  var Education = sequelize.define("Education", {
    schoolName: {
      type: DataTypes.STRING,
      defaultValue: !null
    },
    schoolLocation: {
      type: DataTypes.STRING,
      defaultValue: !null
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
