const campeonato = require('../../model/campeonato')
const relac = require('../../model/relac_campeonato_time')


async function validacao(id_campeonato){

    let resposta = await campeonato.findOne({
        attributes: ['vagas_restantes'],
        where: {
            id_campeonato: id_campeonato
        }
    })

    return resposta

}

async function validacao02(id_campeonato,id_time){

    let resposta = await relac.findOne({
        where: {
            id_campeonato: id_campeonato,
            id_time
        }
    })

    return resposta

}


module.exports = {
    validacao,
    validacao02
}