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
    foreignKey: { name: 'id_usuario', allowNull: true },
    as: "user",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


//time.sync({force: true})

//time.sync()


module.exports = time
