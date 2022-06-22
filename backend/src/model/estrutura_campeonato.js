const Sequelize = require('sequelize')
const database = require('../database/connection')


const estrutura_campeonato = database.define("estrutura_campeonato", {
    id_estrura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    numero_de_equipes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numero_de_grupos: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    formato: {
        type: Sequelize.STRING(255),
        allowNull: false
    }

})

// estrutura_campeonato.sync({force: true})


module.exports = estrutura_campeonato