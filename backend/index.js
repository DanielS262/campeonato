require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const rotas = require('./src/routes/rotas')

const app = express()
app.use(bodyParser.json({limit:"150mb"}))
app.use(express.json({limit:"150mb"}))
app.use(cors())
app.use(rotas)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})


