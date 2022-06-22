const Sequelize = require('sequelize')
const database = require('../database/connection')
const estatistica_time_campeonato = require('./estatistica_time_campeonato')


const tabela_campeonato = database.define("tabela_campeonatos", {

    id_tabela: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    id_estatistica: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

},
    {
        timestamps: false
    }

)


tabela_campeonato.belongsTo(estatistica_time_campeonato, { foreignKey: "id_estatistica", allowNull: false } )

// tabela_campeonato.sync({force: true})

// tabela_campeonato.sync()

module.exports = tabela_campeonato