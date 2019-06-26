module.exports = function (sequelize, DataTypes) {
  var Login = sequelize.define("Logins", {
    loginName: {
      type: DataTypes.STRING,
      defaultValue: !null,
    },
    loginPassword: {
      type: DataTypes.STRING,
      defaultValue: !null
    }
  });
  return Login;
};