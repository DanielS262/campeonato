const express = require('express')
const rotas = express.Router()
const usuario = require("../controll/usuario")

rotas.post("/campeonato/usuarioPost", usuario.postUsuario)
rotas.get("/campeonato/usuarioGetAll", usuario.getAllUsuarios)
rotas.post("/campeonato/loginUsuario", usuario.loginUsuario)





module.exports = rotas