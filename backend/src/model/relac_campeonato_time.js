const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require("./time")
const campeonato = require("./campeonato")

const relac_campeonato_time = database.define('relac_campeonato_time', {
    id_relac: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
},
{
        timestamps: false
})


// relac_campeonato_time.sync({force: true})

module.exports = relac_campeonato_time