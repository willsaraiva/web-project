const express = require('express')
const mongodb = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

const app = express()

mongodb.connect("mongodb+srv://web2020_1:web2020_1@university.2iceu.mongodb.net/ProjectWEB?retryWrites=true&w=majority",
{   useNewUrlParser: true,
    useUnifiedTopology: true    
})

app.use(cors())

app.use(express.json())
app.use(routes)

app.listen(9999, () => {
    console.log("Ta rolando")
})