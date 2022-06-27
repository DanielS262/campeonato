const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')
const campeonato = require('./campeonato')

const oitavas_final = database.define("oitavas_final", {

    id_oitavas_final: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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

    id_campeonato: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: campeonato, 
            key: 'id_campeonato'
          }
    },

    lado_chave: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    num_time: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

}, {timestamps: false})

oitavas_final.hasMany(time, { foreignKey: "id_time" , allowNull: false})
oitavas_final.hasMany(campeonato, { foreignKey: "id_campeonato" , allowNull: false})

// oitavas_final.sync({ force: true })

module.exports = oitavas_final