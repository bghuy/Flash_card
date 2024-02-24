'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User_Collection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User_Collection.init({
        userId: DataTypes.INTEGER,
        collectionId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'User_Collection',
    });
    return User_Collection;
};