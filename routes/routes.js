const express = require('express');
const router = express.Router();
const Funcao = require('../models/funcao');

//Rotas
router.get('/', (req, res) => {
    res.render('index', { title: 'Home Page'});
});

    // Operações FUNÇÕES
//Index
router.get('/funcao', (req, res) => {
    res.render('funcao/index', { title: 'Funções'});
});

//Página CREATE
router.get('/funcao/create', (req, res) => {
    res.render('funcao/create', { title: 'Cadastrar Função'});
});

//Função CREATE
router.post('/funcao-create', async (req, res) =>{
    const funcao = new Funcao({
        nmFuncao: req.body.nmFuncao,
        dsFuncao: req.body.dsFuncao,
        tpContrato: req.body.tpContrato
    });

    try {
        await funcao.save();
        req.session.message = {
            type: 'success',
            message: 'Função criada com sucesso!'
        };
        res.redirect('/funcao');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});


//Operações CANDIDATO
router.get('/candidato', (req, res) => {
    res.send("Candidatos");
});

module.exports = router;