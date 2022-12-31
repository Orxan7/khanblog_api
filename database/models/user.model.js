const { DataTypes } = require('sequelize');
const { connection } = require('../dbConnection')

const User = connection.define('Users', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.CHAR,
                allowNull: false
            },
        },
        {
            freezeTableName: true
        })


module.exports = User