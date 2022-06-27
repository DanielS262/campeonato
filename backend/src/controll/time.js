const time = require('../model/time')


const postTime = async (req,res) => {

    let id_usuario = req.body.id_usuario
    let nome_time = req.body.nome_time
    let descricao = req.body.descricao
    let foto = req.body.foto
    let uf = req.body.uf
    let mascote = req.body.mascote

    if(id_usuario !== undefined && nome_time !== undefined){

        try{

            const result = await time.create({
                id_usuario: id_usuario, 
                nome: nome_time,
                descricao: descricao,
                foto: foto,
                uf: uf,
                mascote: mascote
            })
            res.status(200).json({result}).end()

        }catch(err){
            res.status(400).json({err: err.errors[0].message}).end()
        }

    }else{
        res.status(400).json({"err": "informe os campos id_usuario e nome_time"}).end()
    }

}
















module.exports = {
    postTime
}