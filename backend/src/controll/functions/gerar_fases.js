const database = require('../../database/connection')


// import dos modelos das tabelas 

const desAvos = require('../../model/desesseis_avos')
const oitavas = require('../../model/oitavas_final')
const quartas = require('../../model/quartas_final')
const semi = require('../../model/semi_final')
const final = require('../../model/final')
const jogos = require('../../model/jogos')

const campeonato = require('../../model/campeonato')
const estruturaCampeonato = require('../../model/estrutura_campeonato') 
const relac = require('../../model/relac_campeonato_time')
const time = require('../../model/time')

async function principal(id_campeonato){

    let retorno
    let arrayTimes = []
    let vetNumAleatorio = []
    let jsonQuartas = {}

    let vagas_restantes = await campeonato.findOne({
        attributes: ['vagas_restantes', 'id_estrutura'],
        where: {
            id_campeonato: id_campeonato
        }
    })

    let estrutura = vagas_restantes.id_estrutura
    vagas_restantes = vagas_restantes.vagas_restantes
    let tipo_campeonato 
    let numero_de_times

    if(vagas_restantes === 0){

        let respostaEstrutura = await estruturaCampeonato.findOne({
            where: {
                id_estrutura: estrutura
            }
        })

        tipo_campeonato = respostaEstrutura.formato
        numero_de_times = respostaEstrutura.numero_de_equipes

        //////////////////////////////////////// if 32 times /////////////////////////////////////////

        if(tipo_campeonato === "Mata-mata" && numero_de_times === 32){

            let getTimes = await relac.findAll({
                attributes: ['id_time'],
                where: {
                    id_campeonato: id_campeonato
                }
            })

        
            await getTimes.forEach((item,index) => {
                arrayTimes.push(item.id_time)
            })


            arrayTimes.sort(function(a, b){return a-b})

            // gera números aleatórios de 1 a 32


            // comando para gerar trinta e dois números aleatórios
            while(vetNumAleatorio.length !== 32){

                let numero = Math.floor(Math.random() * 32 + 1)

                if(vetNumAleatorio.length === 0){
                    vetNumAleatorio.push(Math.floor(Math.random() * 32 + 1))
                }else{

                    let verificacao = true

                    vetNumAleatorio.forEach((item,index) => {

                        if(numero === item){
                            verificacao = false
                        }

                    })

                    if(verificacao === true){
                        vetNumAleatorio.push(numero)
                    }
                }

            }

            //////////////////////////////////////////////////////////////////

            let getAllVagas = []


            // comando para preencher as tabelas quartas finais
            for(let index = 0; index < arrayTimes.length; index++){

                let lado_chave = (vetNumAleatorio[index] > 17) ? 1 : 2
    
                let postDesavos = await desAvos.create({
    
                    id_time: arrayTimes[index],
                    id_campeonato: id_campeonato,
                    num_time: vetNumAleatorio[index],
                    lado_chave: lado_chave
    
                })

            }

        

            retorno = getFasesDesAvos(id_campeonato)
       
        }



        ////////////////////////////////////////// end if 32 //////////////////////////////////////////


        ///////////////////////////////////////// if 16 times /////////////////////////////////////////


        else if(tipo_campeonato === "Mata-mata" && numero_de_times === 16){

            let getTimes = await relac.findAll({
                attributes: ['id_time'],
                where: {
                    id_campeonato: id_campeonato
                }
            })

            
            await getTimes.forEach((item,index) => {
                arrayTimes.push(item.id_time)
            })


            arrayTimes.sort(function(a, b){return a-b})

            // gera números aleatórios de 1 a 16


            // comando para gerar oito números aleatórios
            while(vetNumAleatorio.length !== 16){

                let numero = Math.floor(Math.random() * 16 + 1)

                if(vetNumAleatorio.length === 0){
                    vetNumAleatorio.push(Math.floor(Math.random() * 16 + 1))
                }else{

                    let verificacao = true

                    vetNumAleatorio.forEach((item,index) => {

                        if(numero === item){
                            verificacao = false
                        }

                    })

                    if(verificacao === true){
                        vetNumAleatorio.push(numero)
                    }
                }

            }

            //////////////////////////////////////////////////////////////////


            let getAllVagas = []


            // comando para preencher as tabelas quartas finais
            for(let index = 0; index < arrayTimes.length; index++){

                let lado_chave = (vetNumAleatorio[index] > 9) ? 1 : 2
    
                let postOitavas = await oitavas.create({
    
                    id_time: arrayTimes[index],
                    id_campeonato: id_campeonato,
                    num_time: vetNumAleatorio[index],
                    lado_chave: lado_chave
    
                })

            }

        

            retorno = getFasesOitavas(id_campeonato)
       
        }






        /////////////////////////////////////// end 16 times ///////////////////////////////////////////



        ////////////////////////////////////// if 8 times ///////////////////////////////////////////////
        

        else if(tipo_campeonato === "Mata-mata" && numero_de_times === 8){

            let getTimes = await relac.findAll({
                attributes: ['id_time'],
                where: {
                    id_campeonato: id_campeonato
                }
            })

            

            await getTimes.forEach((item,index) => {
                arrayTimes.push(item.id_time)
            })


            arrayTimes.sort(function(a, b){return a-b})


            
            // gera números aleatórios de 1 a 8


            // comando para gerar oito números aleatórios
            while(vetNumAleatorio.length !== 8){

                let numero = Math.floor(Math.random() * 8 + 1)

                if(vetNumAleatorio.length === 0){
                    vetNumAleatorio.push(Math.floor(Math.random() * 8 + 1))
                }else{

                    let verificacao = true

                    vetNumAleatorio.forEach((item,index) => {

                        if(numero === item){
                            verificacao = false
                        }

                    })

                    if(verificacao === true){
                        vetNumAleatorio.push(numero)
                    }
                }

            }

            //////////////////////////////////////////////////////////////////


            let getAllVagas = []


            // comando para preencher as tabelas quartas finais
            for(let index = 0; index < arrayTimes.length; index++){

                let lado_chave = (vetNumAleatorio[index] > 4) ? 1 : 2
    
                let postQuartas = await quartas.create({
    
                    id_time: arrayTimes[index],
                    id_campeonato: id_campeonato,
                    num_time: vetNumAleatorio[index],
                    lado_chave: lado_chave
    
                })

            }

        

            retorno = getFasesQuartas(id_campeonato)
       
        }


        /////////////////////// Fim if 8 times ///////////////////////////////////////




        /////////////////////////  início if 4 times //////////////////////////////////

        else if(tipo_campeonato === "Mata-mata" && numero_de_times === 4){

           
        let getTimes = await relac.findAll({
            attributes: ['id_time'],
            where: {
                id_campeonato: id_campeonato
            }
        })

        

        await getTimes.forEach((item,index) => {
            arrayTimes.push(item.id_time)
        })


        arrayTimes.sort(function(a, b){return a-b})


        
        // gera números aleatórios de 1 a 4


        // comando para gerar oito números aleatórios
        while(vetNumAleatorio.length !== 4){

            let numero = Math.floor(Math.random() * 4 + 1)

            if(vetNumAleatorio.length === 0){
                vetNumAleatorio.push(Math.floor(Math.random() * 4 + 1))
            }else{

                let verificacao = true

                vetNumAleatorio.forEach((item,index) => {

                    if(numero === item){
                        verificacao = false
                    }

                })

                if(verificacao === true){
                    vetNumAleatorio.push(numero)
                }
            }

        }

        //////////////////////////////////////////////////////////////////

        let getAllVagas = []


        // comando para preencher as tabelas quartas finais
        for(let index = 0; index < arrayTimes.length; index++){

            let lado_chave = (vetNumAleatorio[index] > 2) ? 1 : 2

            let postSemi = await semi.create({

                id_time: arrayTimes[index],
                id_campeonato: id_campeonato,
                num_time: vetNumAleatorio[index],
                lado_chave: lado_chave

            })

        }

        retorno = getFasesSemi(id_campeonato)

        }

        ////////////////////////////////////// fim if 4 times //////////////////////////////////////



        /////////////////////////////////////  início if 2 times //////////////////////////////////



        else if(tipo_campeonato === "Mata-mata" && numero_de_times === 2){

           
            let getTimes = await relac.findAll({
                attributes: ['id_time'],
                where: {
                    id_campeonato: id_campeonato
                }
            })
    
            
    
            await getTimes.forEach((item,index) => {
                arrayTimes.push(item.id_time)
            })
    
    
            arrayTimes.sort(function(a, b){return a-b})
    
    
            
            // gera números aleatórios de 1 a 2
    
    
            // comando para gerar oito números aleatórios
            while(vetNumAleatorio.length !== 2){
    
                let numero = Math.floor(Math.random() * 2 + 1)
    
                if(vetNumAleatorio.length === 0){
                    vetNumAleatorio.push(Math.floor(Math.random() * 2 + 1))
                }else{
    
                    let verificacao = true
    
                    vetNumAleatorio.forEach((item,index) => {
    
                        if(numero === item){
                            verificacao = false
                        }
    
                    })
    
                    if(verificacao === true){
                        vetNumAleatorio.push(numero)
                    }
                }
    
            }
    
            //////////////////////////////////////////////////////////////////
    
    
            console.log("vetor aleatório ",vetNumAleatorio)
            console.log("array times ", arrayTimes)
    
            let getAllVagas = []
    
    
            // comando para preencher as tabelas quartas finais
            for(let index = 0; index < arrayTimes.length; index++){
    
                let lado_chave = (vetNumAleatorio[index] > 1) ? 1 : 2
    
                let postFinal = await semi.create({
    
                    id_time: arrayTimes[index],
                    id_campeonato: id_campeonato,
                    num_time: vetNumAleatorio[index],
                    lado_chave: lado_chave
    
                })
    
            }
    
            retorno = getFasesFinal(id_campeonato)
    
            }




        /////////////////////////////////////  início if 4 times //////////////////////////////////




    }

    return retorno


}


















////////////////////////////////////// Fases Desesseis Avos ////////////////////////////////////


async function getFasesDesAvos(id_campeonato){


    const getAll = await desAvos.findAll({
        attributes: ['id_desesseis_avos', 'id_time', 'id_campeonato', 'lado_chave', 'num_time'],
        raw: false,
        where: {
            id_campeonato: id_campeonato
        }
    })

    let array = []

    await getAll.forEach(async (item,index) => {

        let json = {
            id_des_avos: item.id_des_avos,
            id_oitavas: null,
            id_quartas_final: null,
            id_semi: null,
            id_final: null,
            id_time: item.id_time,
            id_campeonato: item.id_campeonato,
            num_time: item.num_time,
            lado_chave: item.lado_chave
        }

        await array.push(json)
    })


    await array.sort(function(a,b) {

        return a.num_time - b.num_time
    })

    await postJogos(array)

    return array


}

/////////////////////////////////////////// Desesseis Avos /////////////////////////////////////



//////////////////////////////////// Fases Oitavas ///////////////////////////////////////////// 


async function getFasesOitavas(id_campeonato){


    const getAll = await oitavas.findAll({
        attributes: ['id_oitavas_final', 'id_time', 'id_campeonato', 'lado_chave', 'num_time'],
        raw: false,
        where: {
            id_campeonato: id_campeonato
        }
    })

    let array = []

    await getAll.forEach(async (item,index) => {

        let json = {
            id_des_avos: null,
            id_oitavas: item.id_oitavas_final,
            id_quartas_final: null,
            id_semi: null,
            id_final: null,
            id_time: item.id_time,
            id_campeonato: item.id_campeonato,
            num_time: item.num_time,
            lado_chave: item.lado_chave
        }

        await array.push(json)
    })


    await array.sort(function(a,b) {

        return a.num_time - b.num_time
    })

    await postJogos(array)

    return array


}



////////////////////////////////////////////////// Oitavas //////////////////////////////////////////



///////////////////////////////////////// Fases Quartas ////////////////////////////////////////////

async function getFasesQuartas(id_campeonato){


    const getAll = await quartas.findAll({
        attributes: ['id_quartas_final', 'id_time', 'id_campeonato', 'lado_chave', 'num_time'],
        raw: false,
        where: {
            id_campeonato: id_campeonato
        }
    })

    let array = []

    await getAll.forEach(async (item,index) => {

        let json = {
            id_des_avos: null,
            id_oitavas: null,
            id_quartas_final: item.id_quartas_final,
            id_semi: null,
            id_final: null,
            id_time: item.id_time,
            id_campeonato: item.id_campeonato,
            num_time: item.num_time,
            lado_chave: item.lado_chave
        }

        await array.push(json)
    })


    await array.sort(function(a,b) {

        return a.num_time - b.num_time
    })

    await postJogos(array)

    return array


}

////////////////////////////////////////////// Quartas /////////////////////////////////////////


//////////////////////////////////////////// Fases semi ///////////////////////////////////////
async function getFasesSemi(id_campeonato){


    const getAll = await semi.findAll({
        attributes: ['id_semi_final', 'id_time', 'id_campeonato', 'lado_chave', 'num_time'],
        raw: false,
        where: {
            id_campeonato: id_campeonato
        }
    })

    let array = []

    await getAll.forEach(async (item,index) => {

        let json = {
            id_des_avos: null,
            id_oitavas: null,
            id_quartas_final: null,
            id_semi: item.id_semi_final,
            id_final: null,
            id_time: item.id_time,
            id_campeonato: item.id_campeonato,
            num_time: item.num_time,
            lado_chave: item.lado_chave
        }

        await array.push(json)
    })


    await array.sort(function(a,b) {

        return a.num_time - b.num_time
    })

    await postJogos(array)

    return array


}

////////////////////////////////////////// Semi //////////////////////////////////////////////


///////////////////////////////////////// Final /////////////////////////////////////////////


async function getFasesFinal(id_campeonato){


    const getAll = await final.findAll({
        attributes: ['id_final', 'id_time', 'id_campeonato', 'lado_chave', 'num_time'],
        raw: false,
        where: {
            id_campeonato: id_campeonato
        }
    })

    let array = []

    await getAll.forEach(async (item,index) => {

        let json = {
            id_des_avos: null,
            id_oitavas: null,
            id_quartas_final: null,
            id_semi: null,
            id_final: item.id_final,
            id_time: item.id_time,
            id_campeonato: item.id_campeonato,
            num_time: item.num_time,
            lado_chave: item.lado_chave
        }

        await array.push(json)
    })


    await array.sort(function(a,b) {

        return a.num_time - b.num_time
    })

    await postJogos(array)

    return array


}




///////////////////////////////////////// Final /////////////////////////////////////////////











async function postJogos(array){


    for(let i = 0; i < array.length; i+=2){


        let postJogo = jogos.create({

            id_campeonato: array[i].id_campeonato,
            id_des_avos: array[i].id_des_avos,
            id_oitavas: array[i].id_oitavas,
            id_quartas: array[i].id_quartas_final,
            id_semi: array[i].id_semi,
            id_final: array[i].id_final,
            id_time01: array[i].id_time,
            id_time02: array[i+1].id_time,
            gols_time01: 0,
            gols_time02: 0,
            status_jogo: 0
    
        })
        
    }


    


}






module.exports = {
    principal
}