const relac_campeonato_time = require('../model/relac_campeonato_time')
const database = require('../database/connection')

const post_campeonato_time = async (req,res) => {

    let id_time = req.body.id_time
    let id_campeonato = req.body.id_campeonato
    let email = req.body.email
    let id_usuario = req.body.id_usuario

    let stringValidacao = `select id_usuario, email, nome from usuarios where id_usuario = ${id_usuario} and email ='${email}'`

    if(id_time !== undefined && id_campeonato !== undefined && email !== undefined && id_usuario !== undefined){



        try{

            const [results, metadata] = await database.query(stringValidacao);
            // metadata retorna os resultados da operação

            if(results.length > 0){

                res.status(200).json(results[0]).end()

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
