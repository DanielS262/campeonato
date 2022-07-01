const Sequelize = require("sequelize")
const database = require("../database/connection")

const usuario = database.define("usuarios", {

    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    tipo_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nome: {
        type:Sequelize.STRING(255),
        allowNull: false
    },
    foto: {
        type: Sequelize.TEXT
    },
    telefone: {
        type: Sequelize.STRING(15),
        unique: true
    },
    email: {
        type:Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    senha: {
        type:Sequelize.STRING(255),
        allowNull: false
    }
})

// usuario.sync({force: true})


module.exports = usuario
