const Sequelize = require('sequelize')
const usuario = require('../../model/usuario')




async function login(email,senha,id){


    try{

        const resposta = await usuario.findOne({

            attributes: ['nome', 'email'],
            where: {
                id_usuario: id,
                email: email,
                senha: senha
            }
        })


        return resposta


    }catch(err){
        return err
    }
}


module.exports = {
    
    login

}

