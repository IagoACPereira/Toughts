const { DataTypes } = require('sequelize')

const db = require('../db/conn')
const User = require('./User')

const Tought = db.define('Tought', {
    title: {
        type: DataTypes .STRING,
        allowNull: false,
        require: true,
    },
})

Tought.belongsTo(User)  // Pertence à!
User.hasMany(Tought)  // Possui muitos!

module.exports = Tought