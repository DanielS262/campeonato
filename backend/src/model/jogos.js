const database = require('../database/connection')
const Sequelize = require('sequelize')
const campeonato = require('../model/campeonato')
const time = require('../model/time')


const jogos = database.define("jogos", {

    id_jogo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    id_campeonato: {
        type: Sequelize.INTEGER,
        references: {
            model: campeonato, 
            key: 'id_campeonato'
          }
    },
    id_time01: {
        type: Sequelize.INTEGER,
        references: {
            model: time, 
            key: 'id_time'
          }
    },

    id_time02: {
        type: Sequelize.INTEGER,
        references: {
            model: time, 
            key: 'id_time'
          }
    },

    gols_time01: {

        type: Sequelize.INTEGER
    },

    gols_time02: {

        type: Sequelize.INTEGER
    },

    time_vencedor: {
        type: Sequelize.INTEGER,
        references: {
            model: time,
            key: 'id_time'
          }
    },

    status_jogo: {
        type: Sequelize.BOOLEAN
    }

    },
    { 
        timestamps: false 
    }

)

module.exports = jogos

