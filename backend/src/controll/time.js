const time = require('../model/time')
const usuario = require('../model/usuario')

const postTime = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let nome_time = req.body.nome_time
    let descricao = req.body.descricao
    let foto = req.body.foto
    let uf = req.body.uf
    let mascote = req.body.mascote

    if(id_usuario !== undefined && nome_time !== undefined){

        try{

            const result = await time.create({
                id_usuario: id_usuario, 
                nome: nome_time,
                descricao: descricao,
                foto: foto,
                uf: uf,
                mascote: mascote
            })
            res.status(200).json({result}).end()

        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

    }else{
        res.status(400).json({"err": "informe os campos id_usuario e nome_time"}).end()
    }

}

const getAllTimes = async (req,res) => {

    let async = require('async')
    let timeBD
    let jsonTableUser
    let usuarioBD = []
    let arrayTime = []


    try{

        async.series([

            async function (callback){

                timeBD = await time.findAll({
                    attributes: ['id_time', 'nome', 'descricao', 'foto', 'uf', 'mascote', 'id_usuario']
                })

            },

            async function(callback){

                timeBD.forEach((item,index) => {

                   let jsonTime = {

                        id_time: item.id_time,
                        nome: item.nome,
                        descricao: item.descricao,
                        foto: item.foto,
                        uf: item.uf,
                        mascote: item.mascote,
                        id_usuario: item.id_usuario,
                        nome_usuario: null
                    }
                    arrayTime.push(jsonTime)
                })

            },

            async function(callback){

                for( let i = 0; i < arrayTime.length; i++){

                    if(arrayTime[i].id_usuario !== null){
                        
                        jsonTableUser = await usuario.findByPk(arrayTime[i].id_usuario)

                        let jsonUsuario = {
                            nome_usuario: jsonTableUser.nome,
                            id_time: arrayTime[i].id_time
                        }

                        usuarioBD.push(jsonUsuario)
                        arrayTime[i].nome_usuario = jsonTableUser.nome
                    }
                }
            },

            function(callback){

                if(arrayTime.length > 0){
                    res.status(200).json(arrayTime).end()
                }else{
                    res.status(400).json({"err": "nenhum time encontrado"}).end()
                }
            }
        ])

    }catch(err){
        res.status(400).json(err).end()
    }
}














module.exports = {
    postTime,
    getAllTimes
}