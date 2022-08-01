const relac = require('../model/relac_campeonato_time')
const database = require('../database/connection')

const time = require('../model/time')
const Sequelize = require('sequelize')
const Op = Sequelize.Op


////////////////////////////////////////////////////////////////////////

const login = require('./functions/login')
const timeResposta = require('./functions/busca_time')
const vagasCampeonato = require('./functions/validacao_campeonato')

////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////

const jogosModel = require('../model/jogos')
const campeaoModel = require('../model/campeao')
const finalModel = require('../model/final')
const semiModel = require('../model/semi_final')
const quartasModel = require('../model/quartas_final')
const oitavasModel = require('../model/oitavas_final')
const desAvosModel = require('../model/desesseis_avos')

////////////////////////////////////////////////////////////////////////

const gerarFases = require('./functions/gerar_fases')
const final = require('../model/final')


const post_campeonato_time = async (req,res) => {


    let email = req.body.email
    let id_usuario = req.body.id_usuario
    let senha = req.body.senha

    let id_time = req.body.id_time
    let id_campeonato = req.body.id_campeonato
    


    if(id_usuario !== undefined && email !== undefined && senha !== undefined){


        try{

            let respostaLogin = await login.login(email,senha,id_usuario)


        if(respostaLogin !== null){


            let retTime = await timeResposta.buscaTime(id_time,id_usuario)

            if(retTime !== null){


                let vagas_restantes = await vagasCampeonato.validacao(id_campeonato)

                vagas_restantes = vagas_restantes.vagas_restantes


                if(vagas_restantes > 0){


                    const buscaTime = await vagasCampeonato.validacao02(id_campeonato,id_time)


                    if(buscaTime === null){

                        const postCampeonato = await relac.create({
                            id_campeonato: id_campeonato,
                            id_time: id_time
                        })




                        let retorno = await gerarFases.principal(id_campeonato)

                        await retorno.forEach((item,index) => {
                            console.log(item)

                        })

                                                
                        res.status(200).json(postCampeonato).end()

                        
                        

                    }else{
                        res.status(400).json({"err": "time já registrado nesse campeonato"}).end()
                    }

                    
                }else{

                    res.status(400).json({"err": "não há mais vagas disponíveis para este campeonato"}).end()
                }

            }else{
                res.status(400).json({"err": "time não encontrado"}).end()
            }

        }else{

            res.status(400).json({"err": "email ou senha incorretos"}).end()
        }

        }catch(err){

            res.status(400).json(err).end()
        }

    }else{
        res.status(400).json({"err": "faça login"}).end()
    }
    
}











const deleteTimeCampeonato = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let email = req.body.email
    let senha = req.body.senha
    let id_time = req.body.id_time
    let id_campeonato = req.body.id_campeonato
    

    if(id_usuario !== undefined && email !== undefined && senha !== undefined){


        try{

            let loginUsuario = await login.login(email,senha,id_usuario)


            if(loginUsuario !== null){


                let respUsuarioTime = await time.findOne({

                    where: {
                        id_time: id_time,
                        id_usuario: id_usuario
                    }
                    

                })


                if(respUsuarioTime !== null){


                    let respCampeonatoTime = await relac.findOne({
                        attributes: ['id_relac'],
                        where:{
                            id_campeonato: id_campeonato,
                            id_time: id_time
                        }
                    })


                    if(respCampeonatoTime !== null){



                        let getJogos = await jogosModel.findOne({
                            where: {
                                id_campeonato: id_campeonato,
                                [Op.or]: [
                                    { id_time01: id_time },
                                    { id_time02: id_time }
                                  ]
                            }
                        })


                        if(getJogos !== null){


                            let respIdJogo = getJogos.id_jogo
                            let respIdTime01 = getJogos.id_time01
                            let respIdTime02 = getJogos.id_time02
                            let id_time_resp = (respIdTime01 === id_time) ? respIdTime02 : respIdTime01
                            let timeDeletado = (respIdTime01 === id_time) ? respIdTime01 : respIdTime02

                            let jogoIdFinal = getJogos.id_final
                            let jogoIdSemi = getJogos.id_semi
                            let jogoIdQuartas = getJogos.id_quartas
                            let jogoIdOitavas = getJogos.id_oitavas
                            let jogoIdDesAvos = getJogos.id_des_avos


                            if(jogoIdFinal !== null){

                                let postCampeao = await campeaoModel.create({
                                        id_time: id_time_resp,
                                        id_campeonato: id_campeonato
                                    })


                                    let [resposta, metadados] = await jogosModel.update(
                                        {
                                            time_vencedor: id_time_resp,
                                            status_jogo: 1
                                        },
                                        {
                                            where: {
                                                        id_jogo: respIdJogo
                                                    }
                                        }
                                      )


            
                                res.status(200).json(postCampeao).end()
                                


                            }else{

                                if(jogoIdSemi !== null){


                                    let retSemi = await semiModel.findOne({
                                        where: {
                                            id_campeonato: id_campeonato,
                                            id_time: id_time
                                        }
                                    })

                                    let numeroTime = retSemi.num_time
                                    let lado_chave  = retSemi.lado_chave

                                    let postFinal = await final.create({
                                            id_campeonato: id_campeonato,
                                            id_time: id_time_resp,
                                            num_time: numeroTime,
                                            lado_chave: lado_chave
                                        })

                                        let [resposta, metadados] = await jogosModel.update(
                                            {
                                                time_vencedor: id_time_resp,
                                                status_jogo: 1
                                            },
                                            {
                                                where: {
                                                            id_jogo: respIdJogo
                                                        }
                                            }
                                          )
                
                                    res.status(200).json(postFinal).end()

                                }else{


                                    if(jogoIdQuartas !== null){

                                        let retQuartas = await quartasModel.findOne({
                                            where: {
                                                id_campeonato: id_campeonato,
                                                id_time: id_time
                                            }
                                        })
    
                                        let numeroTime = retQuartas.num_time
                                        let lado_chave  = retQuartas.lado_chave

                                        let postSemi = await semiModel.create({
                                            id_campeonato: id_campeonato,
                                            id_time: id_time_resp,
                                            num_time: numeroTime,
                                            lado_chave: lado_chave
                                        })


                                        let [resposta, metadados] = await jogosModel.update(
                                            {
                                                time_vencedor: id_time_resp,
                                                status_jogo: 1
                                            },
                                            {
                                                where: {
                                                            id_jogo: respIdJogo
                                                        }
                                            }
                                          )

                                        res.status(200).json(postSemi).end()


                                    }else{


                                        if(jogoIdOitavas !== null){


                                            let retOitavas = await oitavasModel.findOne({
                                                where: {
                                                    id_campeonato: id_campeonato,
                                                    id_time: id_time
                                                }
                                            })
        
                                            let numeroTime = retOitavas.num_time
                                            let lado_chave  = retOitavas.lado_chave



                                            let postQuartas = await quartasModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: id_time_resp,
                                                num_time: numeroTime,
                                                lado_chave: lado_chave
                                            })

                                            let [resposta, metadados] = await jogosModel.update(
                                                {
                                                    time_vencedor: id_time_resp,
                                                    status_jogo: 1
                                                },
                                                {
                                                    where: {
                                                                id_jogo: respIdJogo
                                                            }
                                                }
                                              )
    
                                            res.status(200).json(postQuartas).end()
    
                                            
                                        }else{


                                            if(jogoIdDesAvos !== null){


                                                let retDesAvos = await desAvosModel.findOne({
                                                    where: {
                                                        id_campeonato: id_campeonato,
                                                        id_time: id_time
                                                    }
                                                })
            
                                                let numeroTime = retDesAvos.num_time
                                                let lado_chave  = retDesAvos.lado_chave

                                                let postOitavas = await oitavasModel.create({
                                                    id_campeonato: id_campeonato,
                                                    id_time: id_time_resp,
                                                    num_time: numeroTime,
                                                    lado_chave: lado_chave
                                                })

                                                let [resposta, metadados] = await jogosModel.update(
                                                    {
                                                        time_vencedor: id_time_resp,
                                                        status_jogo: 1
                                                    },
                                                    {
                                                        where: {
                                                                    id_jogo: respIdJogo
                                                                }
                                                    }
                                                  )
        
                                                res.status(200).json(postOitavas).end()  

                                            }else{


                                                res.status(400).json({"err": "time não encontrado"}).end()


                                                /////////////////////////////////////////////////////////////////////////////////////////////////////////

                                            }

                                        }

                                    }

                                }

                            }

                        }else{


                            let deleteTime = await relac.destroy({
                                where: {
                                    id_campeonato: id_campeonato,
                                    id_time: id_time
                                }
                            })


                            if(deleteTime === 1){
                                res.status(200).json({"resp": "time excluido com sucesso"}).end()
                    
                              }else{
                                res.status(400).json({"resp": "time não encontrado"}).end()
                              }


                        }

                    }else{

                        res.status(400).json({"err": "time não encontrado"}).end()

                    }

                }else{

                    res.status(200).json({"err": "time não encontrado"}).end()

                }


        }else{
            res.status(400).json({"err": "Usuário não encontrado"}).end()
        }


        }catch(err){

            res.status(200).json(err).end()
        }

    }else{

        res.status(400).json({"err": "Faça login"}).end()
    }
}




module.exports = {
    post_campeonato_time,
    deleteTimeCampeonato
}
