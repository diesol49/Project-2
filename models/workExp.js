module.exports = function (sequelize, DataTypes) {
    var WorkExp = sequelize.define("WorkExps", {
        jobTitle: {
            type: DataTypes.STRING,
            defaultValue: !null,
        },
        company: {
            type: DataTypes.STRING,
            defaultValue: !null
        },
        location: {
            type: DataTypes.STRING
        },
        dateOfEmployment: {
            type: DataTypes.STRING
        },
        jobDescription: {
            type: DataTypes.STRING
        }
    });
    return WorkExp;
};