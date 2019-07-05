module.exports = function(sequelize, Sequelize) {
  var Userinfo = sequelize.define("Userinfo", {
    firstName: {
      type: Sequelize.STRING,
      defaultValue: !null
    },
    lastName: {
      type: Sequelize.STRING,
      defaultValue: !null
    },
    aboutMe: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    contactInfo: {
      type: Sequelize.STRING
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
