const campeonato = require('../model/campeonato')
const Sequelize = require('sequelize')
const estrutura = require('../model/estrutura_campeonato')
const Op = Sequelize.Op
const usuario = require('../model/usuario')

const postCampeonato = async (req,res) => {


    let id_estrutura = req.body.id_estrutura
    let nome = req.body.nome
    let foto = req.body.foto


    if(id_estrutura !== undefined && nome !== undefined){


        foto = (foto !== undefined) ? foto : "Sem dados"

        try{

            const num_time = await estrutura.findByPk(id_estrutura)

            const times_totais = num_time.numero_de_equipes

            const resposta = await campeonato.create({

                id_estrutura: id_estrutura,
                nome: nome,
                foto: foto,
                vagas_totais: times_totais,
                vagas_preenchidas: 0,
                vagas_restantes: times_totais
            })

            res.status(200).json({ resposta }).end()


        }catch(err){
            res.status(400).json(err).end()
        }

        
    }else{
        res.status(400).json({"err": "informe a estrutura e o nome do campeonato"}).end()
    }


}

const getAllCampeonatos = async (req,res) => {


    try{


        const resposta = await campeonato.findAll()

        if(resposta !== null){

            res.status(200).json(resposta).end()

        }else{
            res.status(400).json({"err": "nenhum campeonato encontrado"}).end()
        }

    }catch(err){
        res.status(400).json(err).end()
    }


}

const getCampeonatoID = async (req,res) => {

    let id_campeonato = req.params.id_campeonato

    if(id_campeonato !== undefined){

        try{

            const resposta = await campeonato.findByPk(id_campeonato)

            if(resposta !== null){

                res.status(200).json(resposta).end()

            }else{
                res.status(400).json({"err": "nenhum campeonato encontrado"}).end()
            }

        }catch(err){
            res.status(400).json(err).end()
        }

    }else{
        res.status(400).json({"err": "informe o id_usuario"}).end()
    }
}

const getCampeonatoNome = async (req,res) => {

    let nome = req.params.nome

    if(nome !== undefined){

        try{

            const resposta = await campeonato.findAll({

                where: {
                    nome: {
                        [Op.like]: `%${nome}%`
                    }
                }
            })

            if(resposta.length > 0){

                res.status(200).json(resposta).end()

            }else{
                res.status(400).json({"err": "nenhum campeonato encontrado"}).end()
            }


        }catch(err){

            res.status(400).json(err).end()
        }

    }else{
        res.status(400).json({"err": "informe o nome do campeonato"}).end()
    }
}

const updateCampeonato = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let email = req.body.email
    let senha = req.body.senha
    let id_campeonato = req.body.id_campeonato
    let nome = req.body.nome
    let foto = req.body.foto


    if(id_campeonato !== undefined && email !== undefined && senha !== undefined && id_usuario !== undefined){


        let respostaLogin = await usuario.findOne({
            where: {
                id_usuario: id_usuario,
                email: email,
                senha: senha
            }
        })


        if(respostaLogin !== null){

            let verificaUsuario = await campeonato.findOne({
                where: {
                    id_usuario: id_usuario,
                    id_campeonato: id_campeonato
                }
            })


            if(verificaUsuario !== null){

                if(nome !== undefined && foto !== undefined){


                    try{
    
                        let resposta = await campeonato.update({
                            nome: nome,
                            foto: foto
                        },
                        {
                            where: {
                                id_campeonato: id_campeonato
                            }
                        }
                        )
                
                        if(resposta[0] === 1){
                            res.status(200).json({"msg": "campeonato alterado com sucesso"}).end()
                        }else{
                            res.status(400).json({"err": "não foi possível alterar o campeonato selecionado"}).end()
                        }
    
                    }catch(err){
                        res.status(400).json(err).end()
                    }
    
                    
    
                }else{
    
                    
                    res.status(400).json({"err": "informe o nome e foto"}).end()
                }

            }else{
                res.status(400).json({"err": "você não pode alterar este campeonato"}).end()

            }



            

            

        }else{
            res.status(400).json({"err": "usuario não encontrado"}).end()
        }

    }else{
        res.status(400).json({"err": "informe o id_campeonato, email, senha, id_usuario"}).end()
    }

}


const deleteCampeonato = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let email = req.body.email
    let senha = req.body.senha
    let id_campeonato = req.body.id_campeonato
   

    if(id_usuario !== undefined && email !== undefined && senha !== undefined && id_campeonato !== undefined){

        let respostaLogin = await usuario.findOne({
            where: {
                id_usuario: id_usuario,
                email: email,
                senha: senha
            }
        })


        if(respostaLogin !== null){

            let verificaUsuario = await campeonato.findOne({
                where: {
                    id_usuario: id_usuario,
                    id_campeonato: id_campeonato
                }
            })

            if(verificaUsuario !== null){

                try{


                    let response = await campeonato.destroy({
                        where: {
                            id_campeonato: id_campeonato
                        }
                    })

                    if(response === 1){
                        res.status(200).json({"resp": "campeonato excluido com sucesso"}).end()
            
                    }else{
                        res.status(400).json({"resp": "campeonato não encontrado"}).end()
                    }


                }catch(err){
                    res.status(400).json(err).end()
                }


            }else{
                res.status(400).json({"err": "você não pode deletar este campeonato"}).end()
            }



        }else{
            res.status(400).json({"err": "usuario não encontrado"}).end()
        }


    }else{
        res.status(400).json({"err": "informe o id_usuario, email, senha e id_campeonato"}).end()
    }


}



module.exports = {
    postCampeonato,
    getAllCampeonatos,
    getCampeonatoID,
    getCampeonatoNome,
    updateCampeonato,
    deleteCampeonato
}

