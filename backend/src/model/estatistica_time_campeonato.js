const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')

const estatistica_time_campeonato = database.define("estatistica_time_campeonatos", {
    
    id_estatistica: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    id_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: time, 
            key: 'id_time'
          }
    },
    pontos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    vitorias: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    derrotas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gols_pro: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gols_contra: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    saldo_gols: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

estatistica_time_campeonato.hasOne(time, { foreignKey: "id_time", allowNull: false })


// estatistica_time_campeonato.sync({force: true})

// estatistica_time_campeonato.sync()

module.exports = estatistica_time_campeonato