const express = require('express')
const rotas = express.Router()
const usuario = require("../controll/usuario")
const time = require("../controll/time")
const relac_campeonato_time = require("../controll/relac_campeonato_time")

rotas.post("/campeonato/usuarioPost", usuario.postUsuario)
rotas.get("/campeonato/usuarioGetAll", usuario.getAllUsuarios)
rotas.post("/campeonato/loginUsuario", usuario.loginUsuario)


rotas.post("/campeonato/timePost", time.postTime)

rotas.post("/campeonato/postTimeCampeonato", relac_campeonato_time.post_campeonato_time)



module.exports = rotas