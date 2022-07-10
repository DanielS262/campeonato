const Sequelize = require('sequelize')
const database = require('../database/connection')
const campeonato = require('./campeonato')
const time = require('./time')

const grupo = database.define("grupos", {

    id_grupo:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    id_campeonato: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_time01: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_time02: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_time03: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_time04: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps: false})

campeonato.hasMany(grupo, { 
    constraint: true,
    foreignKey: { name: 'id_campeonato', allowNull: true },
    as: "campeonato05",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

time.hasOne(grupo, {
    constraint: true,
    foreignKey: { name: 'id_time01', allowNull: true },
    as: "time07",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

time.hasOne(grupo, {
    constraint: true,
    foreignKey: { name: 'id_time02', allowNull: true },
    as: "time08",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

time.hasOne(grupo, {
    constraint: true,
    foreignKey: { name: 'id_time03', allowNull: true },
    as: "time09",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

})

time.hasOne(grupo, {
    constraint: true,
    foreignKey: { name: 'id_time04', allowNull: true },
    as: "time10",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// grupo.sync({force: true})


module.exports = grupo
