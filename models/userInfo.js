module.exports = function(sequelize, DataTypes) {
  var Userinfo = sequelize.define("Userinfo", {
    firstName: {
      type: DataTypes.STRING,
      defaultValue: !null
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: !null
    },
    aboutMe: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    contactInfo: {
      type: DataTypes.STRING
    }
  });
  // // We're associating "Userinfos" with "Logins", so whenever
  // // the login is erased, the userInfo associated with
  // // the Login will delete as well.
  // Userinfo.associate = function(models) {
  //   Userinfo.hasMany(models.Logins, {
  //     onDelete: "cascade"
  //   });
  // };
  return Userinfo;
};
