const { DataTypes } = require('sequelize');
const { connection } = require('../dbConnection');

const Post = connection.define('Posts', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            freezeTableName: true,
            underscored: true
        })


module.exports = Post