const usuario = require("../model/usuario")


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
            attributes: ['id_usuario', 'tipo_usuario', 'nome', 'foto', 'telefone', 'email']
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



module.exports = {
    postUsuario,
    getAllUsuarios,
    loginUsuario
}

