const usuario = require("../model/usuario")
const Sequelize = require("sequelize")
const time = require("../model/time")
const Op = Sequelize.Op

const postUsuario = async (req,res) => {

    let tipo_usuario = req.body.tipo_usuario
    let nome = req.body.nome
    let foto = req.body.foto
    let telefone = req.body.telefone
    let email = req.body.email
    let senha = req.body.senha

    if(nome !== undefined && email !== undefined && senha !== undefined){

        try{

            const result = await usuario.create({
                tipo_usuario: tipo_usuario,
                nome: nome,
                foto: foto,
                telefone: telefone,
                email: email,
                senha: senha
            })

            res.status(200).json({ result }).end()
        }
        catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

    }else{

        res.status(400).json({"err": "informe os campos nome, email, senha"}).end()
    }
}

const getAllUsuarios = async (req, res) => {

    try{

        let resultado = await usuario.findAll({
			raw: true,
            attributes: ['id_usuario', 'nome', 'foto'],
            include: [{
                model: time,
				// required: true, este parametro habilita ou não os usuarios que possuem times
                attributes: ['nome', 'foto', 'descricao', 'uf']
                
            }]
            
        })
		

        if(resultado.length > 0){

            res.status(200).json(resultado).end()
    
        }else{
            res.status(400).json({"err": "nenhum usuário encontrado"}).end()
        }

    }catch(err){
        res.status(400).json({err: err.errors[0].message}).end()
    }

}

const getUsuarioNome = async (req,res) => {

    let nome = req.body.nome

    if(nome !== undefined){

        try{

            let [resultado, metadados] = await usuario.findAll({
                where:  {nome: {
                                    [Op.like]: `%${nome}%`
                                }
                },
                raw: true,
                attributes: ['id_usuario', 'nome', 'foto'],
                include: [{
                    model: time,
                    // required: true, este parametro habilita ou não os usuarios que possuem times
                    attributes: ['nome', 'foto', 'descricao', 'uf']
                    
                }]
                
            })
            
    
            if(resultado.length > 0){
    
                res.status(200).json(resultado).end()
        
            }else{
                res.status(400).json({"err": "nenhum usuário encontrado"}).end()
            }
    
        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

    }else{
        res.status(400).json({"err": "informe o nome a ser pesquisado"}).end()
    }
}

const loginUsuario = async (req,res) => {

    let email = req.body.email
    let senha = req.body.senha

    if(email !== undefined && senha !== undefined){
        try{

            let resultado = await usuario.findOne({ where: { email: email, senha: senha }, 
                attributes: ['id_usuario', 'tipo_usuario', 'nome', 'foto', 'telefone', 'email']
            })

            if(resultado !== null){
                res.status(200).json(resultado).end()
            }
            else{
                res.status(400).json({"err": "usuário não encontrado"}).end()
            }
        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

    }else{
        res.status(400).json({"err": "informe o email e senha"}).end()
    }
}


const updateUsuario = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let nome = req.body.nome
    let foto = req.body.foto
    let telefone = req.body.telefone
    let email = req.body.email
    let senha = req.body.senha


    try{

        let [resposta, metadados] = await usuario.update(
            {
                nome: nome,
                foto: foto,
                telefone: telefone,
                email: email,
                senha: senha
            },
            {
                where: {
                            id_usuario: id_usuario
                        }
            }
          )

          if(resposta !== null){

            res.status(200).json(resposta).end()

          }else{
            res.status(400).json({"err": "usuário não encontrado"}).end()
          }

    }catch(err){
        res.status(400).json({err: err.errors[0].message}).end()
    }
}

const deleteUsuario = async (req,res) => {

    let email = req.body.email
    let senha = req.body.senha
    let id_usuario = req.body.id_usuario

    if(email !== undefined && senha !== undefined && id_usuario !== undefined){

        const resposta = await usuario.destroy({
            where: {
                id_usuario: id_usuario,
                email: email,
                senha: senha
            }
        })

        console.log(resposta)
          if(resposta === 1){
            res.status(200).json({"resp": "usuario excluido com sucesso"}).end()

          }else{
            res.status(400).json({"resp": "usuario não encontrado"}).end()
          }
    }else{
        res.status(400).json({"err": "informe o id_usuario, email, senha"}).end()
    }
}

module.exports = {
    postUsuario,
    getAllUsuarios,
    loginUsuario,
    getUsuarioNome,
    updateUsuario,
    deleteUsuario
}