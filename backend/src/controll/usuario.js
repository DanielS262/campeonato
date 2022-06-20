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



module.exports = {
    postUsuario
}

