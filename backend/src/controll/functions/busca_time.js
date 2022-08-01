const Sequelize = require('sequelize')
const time = require('../../model/time')


async function buscaTime(id_time,id_usuario){

    let retorno = await time.findOne({
        where: {
            id_time: id_time,
            id_usuario: id_usuario
        }
    })


    return retorno


}


module.exports = {
    buscaTime
}