const Sequelize = require('sequelize')
const database = require("../database/connection")
const time = require("./time")


const jogador = database.define("jogadores", {

    id_jogador:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    nome:{
        type: Sequelize.STRING(255),
        allowNull: false
    },
    numero_camisa:{
        type: Sequelize.STRING(255)
    },
    pe_dominante:{
        type: Sequelize.STRING(255),
        allowNull: false
    },

})


time.hasMany(jogador, {
    constraint: true,
    foreignKey: { name: 'id_time', allowNull: true },
    as: "times",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// jogador.sync({force: true})


module.exports = jogador