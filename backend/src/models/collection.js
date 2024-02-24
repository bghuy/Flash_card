'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Collection.belongsToMany(models.User, {
                through: 'User_Collection',
                foreignKey: 'collectionId' // Trường khóa ngoại trong bảng trung gian liên kết với Collection
            });
            Collection.hasMany(models.Card, { foreignKey: 'collectionId' });
        }
    }
    Collection.init({
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        ratting: DataTypes.FLOAT,
    }, {
        sequelize,
        modelName: 'Collection',
    });
    return Collection;
};