const { DataTypes } = require('sequelize');
const db = require('../db')


const User = db.define('user', {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false 
    }
})

module.exports = User;