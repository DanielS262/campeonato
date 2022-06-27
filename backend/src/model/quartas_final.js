const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')
const campeonato = require('./campeonato')

const quartas_final = database.define("quartas_final", {

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

quartas_final.hasMany(time, { foreignKey: "id_time" , allowNull: false})
quartas_final.hasMany(campeonato, { foreignKey: "id_campeonato" , allowNull: false})

// quartas_final.sync({ force: true })

module.exports = quartas_final