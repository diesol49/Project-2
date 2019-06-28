module.exports = function(sequelize, DataTypes) {
  var Login = sequelize.define("Logins", {
    loginName: {
      type: DataTypes.STRING,
      defaultValue: !null
    },
    loginPassword: {
      type: DataTypes.STRING,
      defaultValue: !null
    }
  });

  // Login.associate = function(models) {
  //   Login.belongsTo(models.userInfos, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Login;
};
