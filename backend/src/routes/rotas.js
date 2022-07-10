const express = require('express')
const rotas = express.Router()
const usuario = require("../controll/usuario")
const time = require("../controll/time")
const relac_campeonato_time = require("../controll/relac_campeonato_time")


rotas.post("/campeonato/usuarioPost", usuario.postUsuario)
rotas.get("/campeonato/usuarioGetAll", usuario.getAllUsuarios)
rotas.get("/campeonato/usuarioGetNome", usuario.getUsuarioNome)
rotas.post("/campeonato/loginUsuario", usuario.loginUsuario)
rotas.put("/campeonato/usuarioUpdate", usuario.updateUsuario)
rotas.delete("/campeonato/usuarioDelete", usuario.deleteUsuario)

rotas.post("/campeonato/timePost", time.postTime)
rotas.get("/campeonato/timeGetAll", time.getAllTimes)
rotas.get("/campeonato/timeGetIdUsuario/:id_usuario", time.getTimeIdUsuario)
rotas.get("/campeonato/timeGetNomeTime/:nome_time", time.getTimeNome)
rotas.get("/campeonato/timeGetNomeUsuario/:nome_usuario", time.getTimeNomeUsuario)
rotas.put("/campeonato/timeUpdate", time.updateTime)
rotas.delete("/campeonato/timeDelete", time.deleteTime)


rotas.post("/campeonato/postTimeCampeonato", relac_campeonato_time.post_campeonato_time)




module.exports = rotas