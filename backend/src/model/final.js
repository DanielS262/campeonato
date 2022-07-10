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

final.hasMany(time, { 
    foreignKey: { name: 'id_time', allowNull: true },
    as: "time06",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

final.hasMany(campeonato, { 
    constraint: true,
    foreignKey: { name: 'id_campeonato', allowNull: true },
    as: "campeonato04",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// final.sync({ force: true })

module.exports = final