const database = require('../database/connection')
const relac_campeonato_time = require('../model/relac_campeonato_time')
const desesseis_avos = require('../model/desesseis_avos')
const oitavas_finais = require('../model/oitavas_final')
const quartas_finais = require('../model/quartas_final')
const semi_finais = require('../model/semi_final')
const finais = require('../model/final')

async function insertTabelas(id_campeonato){

    let stringVagasRest = `select vagas_restantes from campeonatos where id_campeonato = 2`

    const vagasRestantes = await database.query(stringVagasRest)
    const vgRestantes = vagasRestantes[0][0].vagas_restantes


    if(vgRestantes === 0){

        let stringContTime = `select COUNT(id_time) as contagem from relac_campeonato_times where id_campeonato = ${id_campeonato}`
        let stringNumCampeonato = `select numero_de_equipes from estrutura_campeonatos where id_estrutura = 
        (select id_estrutura from campeonatos where id_campeonato = ${id_campeonato})`
        let stringFormato = `select formato from estrutura_campeonatos where id_estrutura = 
        (select id_estrutura from campeonatos where id_campeonato = ${id_campeonato})`

        const retorno = await database.query(stringContTime)
        const numEquipes = await database.query(stringNumCampeonato)
        const formato = await database.query(stringFormato)
        const formRetorno = formato[0][0].formato


        const contagem = retorno[0][0].contagem
        const numEquipesRetorno = numEquipes[0][0].numero_de_equipes
        let vetRand = []

        for(let i = 0; i < numEquipesRetorno; i++){

            if(vetRand.length === 0){

                let numero = Math.floor(Math.random()*(numEquipesRetorno-1+1))+1

                vetRand.push(numero)
            }else{

                let numero = Math.floor(Math.random()*(numEquipesRetorno-1+1))+1

                let validacao = false

                vetRand.forEach((item,index) => {

                    if(numero === item){
                        
                        validacao = true
                    }

                })

                if(validacao === false){
                    vetRand.push(numero)
                }else{

                    while(validacao === true){

                        numero = Math.floor(Math.random()*(numEquipesRetorno-1+1))+1

                        validacao = false

                        vetRand.forEach((item,index) => {
                            if(numero === item){
                                validacao = true
                            }
                        })

                        if(validacao === false){
                            vetRand.push(numero)
                        }

                    }
                }

            }

            } 

           

            if(formRetorno === "Mata-mata" && numEquipesRetorno === 32){

                const stringIDS = await relac_campeonato_time.findAll({
                    attributes: ['id_time'],
                    where: {
                        id_campeonato: id_campeonato
                    }
                })
    
                let vetIdsTimes = []
    
                stringIDS.forEach((item,index) => {
    
                    vetIdsTimes.push(item.id_time)
                })
            

                await desesseis_avos.destroy({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })


                for(let j = 0; j < vetIdsTimes.length; j++){

                    let chave = j < 16 ? 1 : 2

                    const desesseisAvos = await desesseis_avos.create({
    
                        id_time: vetIdsTimes[j],
                        id_campeonato: id_campeonato,
                        lado_chave: chave,
                        num_time: vetRand[j]
                    })

                }

            }else if(formRetorno === "Mata-mata" && numEquipesRetorno === 16){

                const stringIDS = await relac_campeonato_time.findAll({
                    attributes: ['id_time'],
                    where: {
                        id_campeonato: id_campeonato
                    }
                })
    
                let vetIdsTimes = []
    
                stringIDS.forEach((item,index) => {
    
                    vetIdsTimes.push(item.id_time)
                })
            
                console.log("vetIdsTimes: ", vetIdsTimes)


                await oitavas_finais.destroy({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })


                for(let j = 0; j < vetIdsTimes.length; j++){

                    let chave = j < 8 ? 1 : 2

                    const oitavas = await oitavas_finais.create({
    
                        id_time: vetIdsTimes[j],
                        id_campeonato: id_campeonato,
                        lado_chave: chave,
                        num_time: vetRand[j]
                    })

                }

            }else if(formRetorno === "Mata-mata" && numEquipesRetorno === 8){

                const stringIDS = await relac_campeonato_time.findAll({
                    attributes: ['id_time'],
                    where: {
                        id_campeonato: id_campeonato
                    }
                })

                let vetIdsTimes = []

                stringIDS.forEach((item,index) => {

                    vetIdsTimes.push(item.id_time)
                })
        

                await quartas_finais.destroy({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })


                for(let j = 0; j < vetIdsTimes.length; j++){

                    let chave = j < 4 ? 1 : 2

                    const quartas = await quartas_finais.create({

                        id_time: vetIdsTimes[j],
                        id_campeonato: id_campeonato,
                        lado_chave: chave,
                        num_time: vetRand[j]
                    })

                }

            }







    }
}


module.exports = {

    insertTabelas
}