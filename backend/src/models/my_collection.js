'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class My_Collection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            My_Collection.belongsTo(models.User, { foreignKey: 'userId' });
            My_Collection.hasMany(models.Card, { foreignKey: 'collectionId' });
        }
    }
    My_Collection.init({
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        imageName: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'My_Collection',
    });
    return My_Collection;
};