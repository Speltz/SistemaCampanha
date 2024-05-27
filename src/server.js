const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const conn = require('./config/bd')

    app.use(bodyParser.json())
    app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

    app.listen(5000, function(){
    console.log('Sistema para eleição está rodando na porta 5000!')
})