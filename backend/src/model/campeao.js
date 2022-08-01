const Sequelize = require('sequelize')
const time = require('../model/time')
const campeonato = require('../model/campeonato')
const database = require('../database/connection')


const campeao = database.define("campeoes", {

    id_campeao: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    id_time: {
        type: Sequelize.INTEGER,
        references: {
            model: time, 
            key: 'id_time'
          }
    },

    id_campeonato: {
        type: Sequelize.INTEGER,
        references: {
            model: campeonato, 
            key: 'id_campeonato'
          }
    }

},  {   timestamps: false   })




module.exports = campeao

