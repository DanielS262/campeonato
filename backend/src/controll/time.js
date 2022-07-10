const time = require('../model/time')
const usuario = require('../model/usuario')
const async = require('async')
const Sequelize = require('sequelize')
const { where } = require('sequelize')
const Op = Sequelize.Op
const relacTime = require('../model/relac_campeonato_time')
const desesseis_avos = require('../model/desesseis_avos')

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

const getTimeIdUsuario = async (req,res) => {

    let id_usuario = req.params.id_usuario
    let userNome
    let resposta = []
    let arrayUsuario = []

        if(id_usuario !== undefined){


            try{


                async.series([

                   async function(callback){

                        resposta = await time.findAll({
                            where: {
                                id_usuario: id_usuario
                            }
                        })

                        console.log(resposta)
                    },

                   

                    async function(callback){

                        for(let i = 0; i < resposta.length; i++){

                            let jsonUser = {

                                id_time: resposta[0].id_time,
                                nome: resposta[0].nome,
                                descricao: resposta[0].descricao,
                                foto: resposta[0].foto,
                                uf: resposta[0].uf,
                                mascote: resposta[0].mascote,
                                id_usuario: resposta[0].id_usuario,
                                nome_usuario: null
                            }

                            arrayUsuario.push(jsonUser)
                        }


                    },

                    async function(callback){

                        for(let i = 0; i < arrayUsuario.length; i++){

                            if(arrayUsuario[i].id_usuario !== null){

                                userNome = await usuario.findByPk(arrayUsuario[i].id_usuario)

                                let jsonUsuario = {
                                    nome_usuario: userNome.nome,
                                    id_time: arrayUsuario[i].id_time
                                }

                                arrayUsuario[i].nome_usuario = jsonUsuario.nome_usuario
                            }
                        }
                    },

                    function(callback){

                        if(arrayUsuario.length > 0){
                            res.status(200).json(arrayUsuario).end()
                        }else{
                            res.status(400).json({"err": "nenhum time encontrado com esse id_usuario"}).end()
                        }

                    }

                ])

            }catch(err){

                res.status(400).json({err: err.errors[0].message}).end()
            }


        
        }else{
            res.status(400).json({"err": "informe o id_usuario"}).end()
        }

}

const getTimeNome = (req,res) => {

    let nome_time = req.params.nome_time
    let userNome
    let resposta = []
    let arrayUsuario = []


    if(nome_time !== undefined){


        try{


            async.series([

               async function(callback){

                    resposta = await time.findAll({
                        where:  {nome: {
                            [Op.like]: `%${nome_time}%`
                        }
        },
                    })

                    console.log(resposta)
                },

               

                async function(callback){

                    for(let i = 0; i < resposta.length; i++){

                        let jsonUser = {

                            id_time: resposta[0].id_time,
                            nome: resposta[0].nome,
                            descricao: resposta[0].descricao,
                            foto: resposta[0].foto,
                            uf: resposta[0].uf,
                            mascote: resposta[0].mascote,
                            id_usuario: resposta[0].id_usuario,
                            nome_usuario: null
                        }

                        arrayUsuario.push(jsonUser)
                    }


                },

                async function(callback){

                    for(let i = 0; i < arrayUsuario.length; i++){

                        if(arrayUsuario[i].id_usuario !== null){

                            userNome = await usuario.findByPk(arrayUsuario[i].id_usuario)

                            let jsonUsuario = {
                                nome_usuario: userNome.nome,
                                id_time: arrayUsuario[i].id_time
                            }

                            arrayUsuario[i].nome_usuario = jsonUsuario.nome_usuario
                        }
                    }
                },

                function(callback){

                    if(arrayUsuario.length > 0){
                        res.status(200).json(arrayUsuario).end()
                    }else{
                        res.status(400).json({"err": "nenhum time encontrado com esse nome"}).end()
                    }

                }

            ])

        }catch(err){

            res.status(400).json({err: err.errors[0].message}).end()
        }


    }else{

        res.status(400).json({"err": "informe o nome "})

    }
    
}

const getTimeNomeUsuario = async (req,res) => {

    let nome_usuario = req.params.nome_usuario
    let resposta
    let respostaTime
    let arrayUsuario = []
    let arrayResponse = []
    let condicao = false

    if(nome_usuario !== undefined){

        try{

            async.series([

               async function(callback){

                   resposta = await usuario.findAll({
                        attributes: ["id_usuario","nome"],
                        where:  {nome: {
                            [Op.like]: `%${nome_usuario}%`
                            }
                        }
                    })

                },

                async function(callback){

                    if(resposta.length > 0){
                        condicao = true

                        await resposta.forEach((item,index) => {
                            let jsonUser = {
                                id_usuario: item.id_usuario,
                                nome_usuario: item.nome
                            }
                            arrayUsuario.push(jsonUser)
                        })
    
                    }else{
                        condicao = false
                    }
            
                },

                async function(callback){

                    if(condicao == true){

                        for(let i = 0; i < arrayUsuario.length; i++){

                            respostaTime = await time.findAll({
                                where:{
                                    id_usuario: arrayUsuario[i].id_usuario
                                } 
                            })
    
                            let jsonTime = {
                                nome: respostaTime[0].nome,
                                descricao: respostaTime[0].descricao,
                                foto: respostaTime[0].foto,
                                uf: respostaTime[0].uf,
                                mascote: respostaTime[0].mascote,
                                nome_usuario: arrayUsuario[i].nome_usuario
                            }
                            arrayResponse.push(jsonTime)
                        }
                    }
                },

                async function(callback){

                    if(condicao == true){

                        if(arrayResponse.length > 0){
                            res.status(200).json(arrayResponse).end()
                        }else{
                            res.status(400).json({"err": "nenhum time encontrado com esse nome"}).end()
                        }

                    }else{
                         // console.log("entrou na condição")
                        res.status(400).json({"err": "nenhum time encontrado com esse nome"}).end()
                    }

                }

            ])

        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }
    }else{
        res.status(400).json({"err": "informe o nome do usuario"})
    }
}

const updateTime = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let email = req.body.email
    let senha = req.body.senha
    let id_time = req.body.id_time
    let nome = req.body.nome
    let descricao = req.body.descricao
    let foto = req.body.foto
    let uf = req.body.uf
    let mascote = req.body.mascote

    let respostaLogin
    let respostaTime

    if(id_usuario !== undefined && email !== undefined && senha !== undefined){


        try{

            respostaLogin = await usuario.findOne({
                where: {
                    id_usuario: id_usuario,
                    email: email,
                    senha: senha
                }
            })
    
            if(respostaLogin !== null){
    
                respostaTime = await time.update({
                    nome: nome,
                    descricao: descricao,
                    foto: foto,
                    uf: uf,
                    mascote: mascote
                },
                {
                    where: {
                        id_time: id_time,
                        id_usuario: id_usuario
                    }
                }
                )
        
                if(respostaTime[0] === 1){
                    res.status(200).json({"msg": "time alterado com sucesso"}).end()
                }else{
                    res.status(400).json({"err": "não foi possível alterar o time selecionado"}).end()
                }
    
            }else{
                res.status(400).json({"err": "usuario não encontrado"}).end()
            }

        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

        


    }else{
        res.status(400).json({"err": "Faça login para alterar este time"}).end()
    }

}

const deleteTime = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let id_time = req.body.id_time
    let email = req.body.email
    let senha = req.body.senha
    let respostaLogin
    let resposta
    let buscaCampeonato

    if(id_usuario !== undefined && email !== undefined && senha !== undefined){

        try{

            respostaLogin = await usuario.findOne({
                where: {
                    id_usuario: id_usuario,
                    email: email,
                    senha: senha
                }
            })


            if(respostaLogin !== null){

                buscaCampeonato = await relacTime.findOne({
                    attributes: ['id_relac'],
                    where: {
                        id_time: id_time
                    }
                })

                if(buscaCampeonato !== null){

                    await relacTime.destroy({
                        where:{
                            id_relac: buscaCampeonato.id_relac
                        }
                    })

                }



                buscaDesAvos = await desesseis_avos.findOne({
                    attributes: ['id_desesseis_avos'],
                    where: {
                        id_time: id_time
                    }
                })

                if(buscaDesAvos !== null){

                    await desesseis_avos.destroy({
                        where:{
                            id_desesseis_avos: buscaDesAvos.id_desesseis_avos
                        }
                    })

                }





                resposta = await time.destroy({
                    where: {
                        id_usuario: id_usuario,
                        id_time: id_time
                    }
                })

                if(resposta === 1){
                    res.status(200).json({"resp": "time excluido com sucesso"}).end()
        
                  }else{
                    res.status(400).json({"resp": "time não encontrado"}).end()
                  }

            }else{
                res.status(400).json({"err": "usuario não encontrado"}).end()
            }


        }catch(err){

            res.status(400).json(err).end()
        }





        


    }else{
        res.status(400).json({"err": "faça login para excluir o time"}).end()
    }
}









module.exports = {
    postTime,
    getAllTimes,
    getTimeIdUsuario,
    getTimeNome,
    getTimeNomeUsuario,
    updateTime,
    deleteTime
}