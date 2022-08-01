const jogos = require('../model/jogos')
const usuario = require('../model/usuario')
const campeonato = require('../model/campeonato')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const time = require('../model/time')


const desAvosModel = require('../model/desesseis_avos')
const oitavasModel = require('../model/oitavas_final')
const quartasModel = require('../model/quartas_final')
const semiModel = require('../model/semi_final')
const finalModel = require('../model/final')
const campeaoModel = require('../model/campeao')





const getAllJogos =async (req,res) => {

    let resposta = await jogos.findAll()

    if(resposta.length > 0){
        res.status(200).json(resposta).end()
    }else{
        res.status(400).json({"err": "nenhum jogo foi encontrado"}).end()
    }
}


const getIdJogos = async (req,res) => {

    let id_jogo = req.params.id_jogo

    

    if(id_jogo !== undefined){



        try{

            let resposta = await jogos.findByPk(id_jogo)

            if(resposta !== null){

                res.status(200).json(resposta).end()

    
            }else{
                res.status(400).json({"err": "jogo não encontrado"}).end()
            }
    

        }catch(err){
            res.status(400).json(err).end()
        }

        

    }else{
        res.status(400).json({"err": "informe o id_jogo"}).end()
    }

}


const getJogoIdTime = async (req,res) => {


    let id_time = req.params.id_time


    try{


        if(id_time !== undefined){


            let resposta = await jogos.findAll({
                where: {
                    [Op.or]: [
                      { id_time01: id_time },
                      { id_time02: id_time }
                    ]
                  }
            })
    
            if(resposta.length > 0){

                res.status(200).json(resposta).end()
    
            }else{
                res.status(400).json({"err": "nenhum jogo encontrado"}).end()
            }
    
    
        }else{
            res.status(400).json({"err": "informe o id_time"}).end()
        }


    }catch(err){
        res.status(400).json(err).end()
    }

    


}



const getJogoNomeTime = async (req,res) => {

    let nome = req.params.nome

    try{


        if(nome !== undefined){

            let resposta = await time.findAll({
                attributes: ['id_time'],
                where: {
                    nome: {
                        [Op.like]: `%${nome}%`
                    }
                }
            })


            if(resposta.length > 0){


                let response = await jogos.findAll({
                    where: {
                        [Op.or]: [
                          { id_time01: resposta[0].id_time },
                          { id_time02: resposta[0].id_time }
                        ]
                      }
                })


                if(response.length > 0){

                    res.status(200).json(response).end()

                }else{
                    res.status(400).json({"err": "nenhum jogo encontrado"}).end()
                }


            }else{

                res.status(400).json({"err": "time não encontrado"}).end()

            }

    
    
        }else{
            res.status(400).json({"err": "informe o nome do time"}).end()
        }


    }catch(err){
        res.status(400).json(err).end()
    }

    


}


const updateJogos = async (req,res) => {

    // OBS: se os valores dos parâmetros novos enviados forem iguais ao anteriores a querie sql retorna que não foi
    // realizada nenhuma alteração

    let id_usuario = req.body.id_usuario
    let email = req.body.email
    let senha = req.body.senha
    let id_jogo = req.body.id_jogo
    let id_campeonato = req.body.id_campeonato
    let gols_time01 = req.body.gols_time01
    let gols_time02 = req.body.gols_time02
    let time_vencedor = req.body.time_vencedor
    let status_jogo = req.body.status_jogo


    if(id_usuario !== undefined && email !== undefined && senha !== undefined){

        try{

            const login = await usuario.findOne({
                where: {
                    id_usuario: id_usuario,
                    email: email,
                    senha: senha
                }
            })
    
    
            if(login !== null){
    
    
                if(id_campeonato !== undefined && id_jogo !== undefined){
    
                    const busca = await campeonato.findOne({
                        where: {
                            id_campeonato: id_campeonato,
                            id_usuario: id_usuario
                        }
                    })
    
                    if(busca !== null){


                        if(time_vencedor ===  undefined){


                            const resposta = await jogos.update(
                                {
                                    gols_time01: gols_time01,
                                    gols_time02: gols_time02,
                                    status_jogo: status_jogo
                                   //  time_vencedor: time_vencedor
                                },
        
                                {
                                    where: {
                                        id_jogo: id_jogo
                                    }
                                })
                                
        
                                if(resposta[0] === 1){
                                    res.status(200).json({"msg": "jogo alterado com sucesso"}).end()
                                }else{
                                    res.status(400).json({"err": "não foi possível alterar o jogo selecionado"}).end()
                                }


                        }else{




                            const resposta = await jogos.update(
                                {
                                    gols_time01: gols_time01,
                                    gols_time02: gols_time02,
                                    status_jogo: status_jogo,
                                    time_vencedor: time_vencedor
                                },
        
                                {
                                    where: {
                                        id_jogo: id_jogo
                                    }
                                })


                                let getIdJogo = await jogos.findOne({
                                    where: {
                                        id_jogo: id_jogo
                                    }
                                })


                                let retIdFinal = getIdJogo.id_final
                                let retIdSemi = getIdJogo.id_semi
                                let retIdQuartas = getIdJogo.id_quartas
                                let retIdOitavas = getIdJogo.id_oitavas
                                let retIdDesAvos = getIdJogo.id_des_avos

                                

/////////////////////////////////////////////////// início DesAvos ////////////////////////////////////////////////////////////////


                                if(retIdDesAvos !== null){

                                    let getJogosCampeonato = await jogos.findAll({

                                        where: {
                                            id_campeonato: id_campeonato,
                                            [Op.not]: [{ time_vencedor: null }]
                                        }
                                    })

                                    if(getJogosCampeonato.length === 16){

                                        let vetIdTimes = []
                                        
                                        await getJogosCampeonato.forEach((item,index) => {
                                            
                                            vetIdTimes.push(item.time_vencedor)
                                        })

                                        for(let i = 0; i < vetIdTimes.length; i++){

                                            let new_id_time = vetIdTimes[i]

                                            let getDesAvos = await desAvosModel.findOne({
                                                attributes: ['num_time','lado_chave'],
                                                where: {
                                                    id_time: new_id_time
                                                }

                                            })

                                            let postOitavas = await oitavasModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: vetIdTimes[i],
                                                num_time: getDesAvos.num_time,
                                                lado_chave: getDesAvos.lado_chave
                                            })

                                        }

                                    }

                                }

//////////////////////////////////////////////////// end DesAvos //////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////// inicio oitavas  //////////////////////////////////////////////////////////////////////////////////////

                                if(retIdOitavas !== null){

                                    let getJogosCampeonato = await jogos.findAll({

                                        where: {
                                            id_campeonato: id_campeonato,
                                            [Op.not]: [{ time_vencedor: null }]
                                        }
                                    })

                                    if(getJogosCampeonato.length === 8){

                                        let vetIdTimes = []
                                        
                                        await getJogosCampeonato.forEach((item,index) => {
                                            
                                            vetIdTimes.push(item.time_vencedor)
                                        })

                                        for(let i = 0; i < vetIdTimes.length; i++){

                                            let new_id_time = vetIdTimes[i]

                                            let getOitavas = await oitavasModel.findOne({
                                                attributes: ['num_time','lado_chave'],
                                                where: {
                                                    id_time: new_id_time
                                                }

                                            })

                                            let postQuartas = await quartasModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: vetIdTimes[i],
                                                num_time: getOitavas.num_time,
                                                lado_chave: getOitavas.lado_chave
                                            })

                                        }

                                    }

                                }


//////////////////////////////////////////////// end Oitavas  /////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////// início Quartas  //////////////////////////////////////////////////////////////////////////////////////

                                if(retIdQuartas !== null){

                                    let getJogosCampeonato = await jogos.findAll({

                                        where: {
                                            id_campeonato: id_campeonato,
                                            [Op.not]: [{ time_vencedor: null }]
                                        }
                                    })

                                    if(getJogosCampeonato.length === 4){

                                        let vetIdTimes = []
                                        
                                        await getJogosCampeonato.forEach((item,index) => {
                                            vetIdTimes.push(item.time_vencedor)
                                        })

                                        for(let i = 0; i < vetIdTimes.length; i++){

                                            let new_id_time = vetIdTimes[i]

                                            let getQuartas = await quartasModel.findOne({
                                                attributes: ['num_time','lado_chave'],
                                                where: {
                                                    id_time: new_id_time
                                                }

                                            })

                                            let postSemi = await semiModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: vetIdTimes[i],
                                                num_time: getQuartas.num_time,
                                                lado_chave: getQuartas.lado_chave
                                            })

                                        }
                                    }

                                }
////////////////////////////////////////////////////// end Quartas ////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////  inicio Semi //////////////////////////////////////////////////////////////

                                if(retIdSemi !== null){

                                    let getJogosCampeonato = await jogos.findAll({

                                        where: {
                                            id_campeonato: id_campeonato,
                                            [Op.not]: [{ time_vencedor: null }]
                                        }
                                    })

                                    if(getJogosCampeonato.length === 2){

                                        let vetIdTimes = []
                                        
                                        await getJogosCampeonato.forEach((item,index) => {
                                            vetIdTimes.push(item.time_vencedor)
                                        })

                                        for(let i = 0; i < vetIdTimes.length; i++){

                                            let new_id_time = vetIdTimes[i]

                                            let getSemi = await semiModel.findOne({
                                                attributes: ['num_time','lado_chave'],
                                                where: {
                                                    id_time: new_id_time
                                                }

                                            })

                                            let postFinal = await finalModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: vetIdTimes[i],
                                                num_time: getSemi.num_time,
                                                lado_chave: getSemi.lado_chave
                                            })

                                        }
                                    }

                                }

/////////////////////////////////////////////////////  end Semi ///////////////////////////////////////////////////////////

////////////////////////////////////////////////////// inicio final ////////////////////////////////////////////////////////


                                if(retIdFinal !== null){

                                    let getJogosCampeonato = await jogos.findAll({

                                        where: {
                                            id_campeonato: id_campeonato,
                                            [Op.not]: [{ time_vencedor: null }]
                                        }
                                    })

                                    if(getJogosCampeonato.length === 1){

                                        let vetIdTimes = []
                                        
                                        await getJogosCampeonato.forEach((item,index) => {
                                            vetIdTimes.push(item.time_vencedor)
                                        })

                                        for(let i = 0; i < vetIdTimes.length; i++){

                                            let new_id_time = vetIdTimes[i]

                                            let getFinal = await finalModel.findOne({
                                                attributes: ['num_time','lado_chave'],
                                                where: {
                                                    id_time: new_id_time
                                                }

                                            })

                                            let postCampeao = await campeaoModel.create({
                                                id_campeonato: id_campeonato,
                                                id_time: vetIdTimes[i]
                                            })

                                        }
                                    }

                                }

////////////////////////////////////////////////////// end final ///////////////////////////////////////////////////////////

                                let getJogosCampeonato = await jogos.findAll({

                                    where: {
                                        id_campeonato: id_campeonato,
                                        [Op.not]: [{ time_vencedor: null }]
                                    }
                                })

                                
        
                                if(resposta[0] === 1){
                                    res.status(200).json({"msg": "jogo alterado com sucesso"}).end()
                                }else{
                                    res.status(400).json({"err": "não foi possível alterar o jogo selecionado"}).end()
                                }


                        }

                    }else{
    
                        res.status(400).json({"err": "você não pode alterar este jogo"}).end()
                    }
    
                }else{
    
                    res.status(400).json({"err": "informe o id_campeonato e id_jogo"}).end()
                }
    
    
            }else{
                res.status(400).json({"err": "usuario não encontrado"}).end()
            }

        }catch(err){
            res.status(400).json(err).end()
        }

    }else{
        res.status(400).jogos({"err": "informe o id_usuario, email e senha"}).end()
    }


}



module.exports = {
    updateJogos,
    getAllJogos,
    getIdJogos,
    getJogoIdTime,
    getJogoNomeTime
}