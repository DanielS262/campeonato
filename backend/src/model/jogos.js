const database = require('../database/connection')
const Sequelize = require('sequelize')
const campeonato = require('../model/campeonato')
const time = require('../model/time')
const desAvos = require('../model/desesseis_avos')
const oitavas = require('../model/oitavas_final')
const quartas = require('../model/quartas_final')
const semi = require('../model/semi_final')
const final = require('../model/final')

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

    id_des_avos: {
        type: Sequelize.INTEGER,
        references: {
            model: desAvos,
            key: 'id_desesseis_avos'
        }
        
    },

    id_oitavas: {
        type: Sequelize.INTEGER,
        references:{
            model: oitavas,
            key: 'id_oitavas_final'
        }
        
    },

    id_quartas: {
        type: Sequelize.INTEGER,
        references:{
            model: quartas,
            key: 'id_quartas_final'
        }
        
    },

    id_semi: {
        type: Sequelize.INTEGER,
        references:{
            model: semi,
            key: 'id_semi_final'
        }
       
    },

    id_final: {
        type: Sequelize.INTEGER,
        references:{
            model: final,
            key: 'id_final'
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

