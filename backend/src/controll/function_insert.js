const database = require('../database/connection')
const relac_campeonato_time = require('../model/relac_campeonato_time')
const desesseis_avos = require('../model/desesseis_avos')
const oitavas_finais = require('../model/oitavas_final')
const quartas_finais = require('../model/quartas_final')
const jogos = require('../model/jogos')


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



                ////////////////////////////////////////


                let arrayDesAvos = []
                
                const timesDesAvos = await desesseis_avos.findAll({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })

               

                for(let d = 0; d < timesDesAvos.length; d++){

                    let jsonDesAvos = {
                        id_campeonato: timesDesAvos[d].id_campeonato,
                        id_time: timesDesAvos[d].id_time,
                        lado_chave: timesDesAvos[d].lado_chave,
                        num_time: timesDesAvos[d].num_time
                    }

                    arrayDesAvos.push(jsonDesAvos)
                }

                await arrayDesAvos.sort(function (a, b) {
                    if (a.num_time > b.num_time) {
                      return 1;
                    }
                    if (a.num_time < b.num_time) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });


                for(let h = 0; h < (arrayDesAvos.length); h+=2){

                    await jogos.create({

                        id_campeonato: id_campeonato,
                        id_time01: arrayDesAvos[h].id_time,
                        id_time02: arrayDesAvos[h + 1].id_time,
                        gols_time01: 0,
                        gols_time02: 0,
                        status_jogo: 0
    
                    })


                }


                /////////////////////////////////////////








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

                ///////////////////////////////////////////



                let arrayOitavas = []
                
                const timesOitavas = await oitavas_finais.findAll({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })

               

                for(let d = 0; d < timesOitavas.length; d++){

                    let jsonOitavas = {
                        id_campeonato: timesOitavas[d].id_campeonato,
                        id_time: timesOitavas[d].id_time,
                        lado_chave: timesOitavas[d].lado_chave,
                        num_time: timesOitavas[d].num_time
                    }

                    arrayQuartas.push(jsonOitavas)
                }

                await arrayOitavas.sort(function (a, b) {
                    if (a.num_time > b.num_time) {
                      return 1;
                    }
                    if (a.num_time < b.num_time) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });


                for(let h = 0; h < (arrayOitavas.length); h+=2){

                    await jogos.create({

                        id_campeonato: id_campeonato,
                        id_time01: arrayOitavas[h].id_time,
                        id_time02: arrayOitavas[h + 1].id_time,
                        gols_time01: 0,
                        gols_time02: 0,
                        status_jogo: 0
    
                    })


                }



                /////////////////////////////////////////


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




                let arrayQuartas = []
                
                const timesQuartas = await quartas_finais.findAll({
                    where: {
                        id_campeonato: id_campeonato
                    }
                })

               

                for(let d = 0; d < timesQuartas.length; d++){

                    let jsonQuartas = {
                        id_campeonato: timesQuartas[d].id_campeonato,
                        id_time: timesQuartas[d].id_time,
                        lado_chave: timesQuartas[d].lado_chave,
                        num_time: timesQuartas[d].num_time
                    }

                    arrayQuartas.push(jsonQuartas)
                }

                await arrayQuartas.sort(function (a, b) {
                    if (a.num_time > b.num_time) {
                      return 1;
                    }
                    if (a.num_time < b.num_time) {
                      return -1;
                    }
                    // a must be equal to b
                    return 0;
                  });


                for(let h = 0; h < (arrayQuartas.length); h+=2){

                    await jogos.create({

                        id_campeonato: id_campeonato,
                        id_time01: arrayQuartas[h].id_time,
                        id_time02: arrayQuartas[h + 1].id_time,
                        gols_time01: 0,
                        gols_time02: 0,
                        status_jogo: 0
    
                    })


                }
                
            }

    }
}


module.exports = {

    insertTabelas
}