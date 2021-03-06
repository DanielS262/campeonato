const Sequelize = require('sequelize')
const database = require('../database/connection')
const estrutura = require('./estrutura_campeonato')
const usuario = require('../model/usuario')

const campeonato = database.define("Campeonatos", {
   
    id_campeonato: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    id_estrutura: {
        type: Sequelize.INTEGER,
        references: {
            model: estrutura,
            key: "id_estrutura"
        }
    },

    id_usuario: {
        type: Sequelize.INTEGER,
        references: {
            model: usuario,
            key: "id_usuario"
        }
    },

    nome: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    foto: {
        type: Sequelize.TEXT
    },

    vagas_totais: {
        type: Sequelize.INTEGER
    },
    vagas_restantes: {
        type: Sequelize.INTEGER
    },
    vagas_preenchidas: {
        type: Sequelize.INTEGER
    }
})


estrutura.belongsTo(campeonato, 
    
    {
        constraint: true,
        foreignKey: { name: 'id_estrutura', allowNull: true },
        as: "estrutura",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

    })

    usuario.belongsTo(campeonato, 
    
        {
            constraint: true,
            foreignKey: { name: 'id_usuario', allowNull: true },
            as: "usuario",
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
    
        })

// campeonato.sync({force: true})

//campeonato.sync()

module.exports = campeonato