const { DataTypes } = require('sequelize')

const db = require('../db/connection')

const User = require('./User')

//criando scheama
const Address = db.define('Address', {

    street:{
        type: DataTypes.STRING,
        require: true,
    },
    number:{
        type: DataTypes.STRING,
        require: true,
    },
    city:{
        type: DataTypes.STRING,
        require: true,
    },
})

User.hasMany(Address)
//relacionamento entre as duas tabelas
Address.belongsTo(User)

module.exports = Address