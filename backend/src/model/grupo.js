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

campeonato.hasMany(grupo, { foreignKey: "id_campeonato", allowNull: false })
time.hasOne(grupo, { foreignKey: "id_time01", allowNull: false })
time.hasOne(grupo, { foreignKey: "id_time02", allowNull: false })
time.hasOne(grupo, { foreignKey: "id_time03", allowNull: false })
time.hasOne(grupo, { foreignKey: "id_time04", allowNull: false })


// grupo.sync({force: true})


module.exports = grupo
