const Sequelize = require('sequelize')
const database = require('../database/connection')


const campeonato = database.define("Campeonatos", {
    id_campeonato: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    foto: {
        type: Sequelize.TEXT
    },
    vagas_restantes: {
        type: Sequelize.INTEGER
    },
    vagas_preenchidas: {
        type: Sequelize.INTEGER
    }
})



// campeonato.sync({force: true})

module.exports = campeonato