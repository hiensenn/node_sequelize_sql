 //importando o sequelize
 const { Sequelize } =  require('sequelize') 

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try{

    sequelize.authenticate();
    console.log('conectado com sucesso')

}catch(err){
    console.log('não foi possível conectar', error)
}

module.exports = sequelize

//o sequelize só vai rodar no mysql2, então dar o npm install mysql2