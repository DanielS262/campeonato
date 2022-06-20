require('dotenv').config();

const Sequelize = require('sequelize')

const sequelize = new Sequelize("campeonato", "root", "", {

    host: process.env.HOST,
    dialect: "mysql"

})



sequelize.authenticate()
.then(() => {
    console.log("Conexão realizada com sucesso")
})
.catch((error) => {
    console.error("Erro na conexão: " + error)
})
    




module.exports = sequelize




