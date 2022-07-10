const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')
const campeonato = require('./campeonato')

const desesseis_avos = database.define("desesseis_avos", {

    id_desesseis_avos: {
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

desesseis_avos.hasMany(time, {
    constraint: true,
    foreignKey: { name: 'id_time', allowNull: true },
    as: "time03",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



desesseis_avos.hasMany(campeonato, {
    constraint: true,
    foreignKey: { name: 'id_campeonato', allowNull: true },
    as: "campeonato02",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// desesseis_avos.sync({ force: true })

module.exports = desesseis_avos