module.exports = function (sequelize, DataTypes) {
    var Userinfo = sequelize.define("Userinfos", {
        firstName: {
            type: DataTypes.STRING,
            defaultValue: !null,
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
    return Userinfo;
};