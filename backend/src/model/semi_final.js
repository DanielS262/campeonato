const Sequelize = require('sequelize')
const database = require('../database/connection')
const time = require('./time')
const campeonato = require('./campeonato')

const semi_final = database.define("semi_finais", {

    id_semi_final: {
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

semi_final.hasMany(time, 
    {
        constraint: true,
        foreignKey: { name: 'id_time', allowNull: true },
        as: "times02",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })



semi_final.hasMany(campeonato, 
    {
        constraint: true,
        foreignKey: { name: 'id_campeonato', allowNull: true },
        as: "campeonato",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })

// semi_final.sync({ force: true })

module.exports = semi_final