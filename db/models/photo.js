const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Education }) {
      this.belongsTo(Education, { foreignKey: 'education_id' });
    }
  }
  Photo.init(
    {
      education_id: DataTypes.INTEGER,
      urlPhoto: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Photo',
    },
  );
  return Photo;
};
