const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Photo }) {
      this.hasMany(Photo, { foreignKey: 'education_id' });
    }
  }
  Education.init(
    {
      city: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      advertising: DataTypes.STRING,
      uuID: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Education',
    },
  );
  return Education;
};
