//importar o Data types e criar uma classe

const {  DataTypes } = require('sequelize')

//fazer a conexão com o banco com o model
const db = require('../db/connection')

//colocar o nome do model
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    occupation:{
        type: DataTypes.STRING,
        required: true,
    },
    newsletter:{
        type: DataTypes.BOOLEAN,
    }
})

module.exports = User 