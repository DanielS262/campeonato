const express = require('express')
const rotas = express.Router()
const usuario = require("../controll/usuario")

rotas.post("/campeonato/usuarioPost", usuario.postUsuario)







module.exports = rotas