const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')
const campeonato = require('./campeonato')

const final = database.define("finais", {

    id_final: {
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

final.hasMany(time, { foreignKey: "id_time" , allowNull: false})
final.hasMany(campeonato, { foreignKey: "id_campeonato" , allowNull: false})

// final.sync({ force: true })

module.exports = final