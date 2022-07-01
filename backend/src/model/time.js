const Sequelize = require('sequelize')
const database = require('../database/connection')
const usuario = require('./usuario')


const time = database.define("times", {

    id_time: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(225),
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING(225)
    },
    foto: {
        type: Sequelize.TEXT
    },
    uf: {
        type: Sequelize.STRING(5)
    },
    mascote: {
        type: Sequelize.STRING(225)
    }

})

usuario.hasMany(time, {
    constraint: true,
    foreignKey: "id_usuario",
    as: "user"
})


//time.sync({force: true})

//time.sync()


module.exports = time
