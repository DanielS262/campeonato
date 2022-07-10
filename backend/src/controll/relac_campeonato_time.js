const relac_campeonato_time = require('../model/relac_campeonato_time')
const database = require('../database/connection')
const functionInsert = require('./function_insert')

const post_campeonato_time = async (req,res) => {

    let id_time = req.body.id_time
    let id_campeonato = req.body.id_campeonato
    let email = req.body.email
    let id_usuario = req.body.id_usuario

    let stringValidacao = `select id_usuario, email, nome from usuarios where id_usuario = ${id_usuario} and email ='${email}'`
    let stringVerificacao = `select count(id_campeonato) as contagem from relac_campeonato_times where id_campeonato = ${id_campeonato}`
    let stringEstrutura = `select vagas_totais from campeonatos where id_campeonato = ${id_campeonato}`

    if(id_time !== undefined && id_campeonato !== undefined && email !== undefined && id_usuario !== undefined){

        try{

            const [results, metadata] = await database.query(stringValidacao)
            // metadata retorna os resultados da operação

            if(results.length > 0){

                const [resultado, metadados] = await database.query(stringVerificacao)
                const [resposta, resultOperacao] = await database.query(stringEstrutura)

                if(resposta.length > 0){

                    if(!(resultado[0].contagem == resposta[0].vagas_totais)){
                        
                        try{
                            const timeCampeonato = await relac_campeonato_time.create({
                                id_campeonato: id_campeonato,
                                id_time: id_time
                            })



                            res.status(200).json({timeCampeonato}).end()

                            functionInsert.insertTabelas(id_campeonato)



                        }catch(err){
                            res.status(400).json(err).end()
                        }
                    }
                    else{
                        res.status(400).json({"err": "o numero de times do campeonato já foi atingido"}).end()
                    }

                }else{
                    res.status(400).json({"err": "não foi possivel o time no campeonato devido o mesmo ainda não ter informado o número de vagas"}).end()
                }
            }else{

                res.status(400).json({"err": "usuario não encontrado"}).end()
            }

        }catch(err){
            res.status(400).json(err).end()
        }
    }else{
        res.status(400).json({"err": "informe os campos id_usuario, id_time, id_campeonato, email"}).end()
    }
}







module.exports = {
    post_campeonato_time
}
