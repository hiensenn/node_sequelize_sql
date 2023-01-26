 //importando o sequelize
 const { Sequelize } =  require('sequelize') 

 //escolhendo o banco de dados a se trabalhar
const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})



 module.exports = sequelize

//o sequelize só vai rodar no mysql2, então dar o npm install mysql2