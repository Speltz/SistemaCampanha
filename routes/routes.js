const express = require('express');
const router = express.Router();

module.exports = (connection) => {
    // Rotas
    router.get('/', (req, res) => {
        res.render('index', { title: 'Home Page' });
    });

    // Operações FUNÇÕES
    // Index
    router.get('/funcao', (req, res) => {
        connection.query('SELECT * FROM tbFuncao', (err, results) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.render('funcao/index', { title: 'Funções', funcao: results });
            }
        });
    });

    // Página CREATE
    router.get('/funcao/create', (req, res) => {
        res.render('funcao/create', { title: 'Cadastrar Função' });
    });

    // Create FUNÇÃO
    router.post('/funcao/create', (req, res) => {
        const { nmFuncao, dsFuncao, tpContrato } = req.body;
        const query = 'INSERT INTO tbFuncao (nmFuncao, dsFuncao, tpContrato) VALUES (?, ?, ?)';
        connection.query(query, [nmFuncao, dsFuncao, tpContrato], (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message, type: 'danger' });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'Função criada com sucesso!'
                };
                res.redirect('/funcao');
            }
        });
    });

    // Página EDIT
    router.get('/funcao/edit/:idFuncao', (req, res) => {
        const idFuncao = req.params.idFuncao;
        const query = 'SELECT * FROM tbFuncao WHERE idFuncao = ?';
    
        connection.query(query, [idFuncao], (err, results) => {
            if (err) {
                res.redirect('/');
            } else {
                if (results.length > 0) {
                    res.render('funcao/edit', {
                        title: 'Editar Função',
                        funcao: results[0]
                    });
                } else {
                    res.redirect('/');
                }
            }
        });
    });
    router.post('/funcao/edit/:idFuncao', (req, res) => {
        const { idFuncao } = req.params;
        const { nmFuncao, dsFuncao, tpContrato } = req.body;
    
        const query = 'UPDATE tbFuncao SET nmFuncao = ?, dsFuncao = ?, tpContrato = ? WHERE idFuncao = ?';
        connection.query(query, [nmFuncao, dsFuncao, tpContrato, idFuncao], (err, result) => {
            if (err) {
                console.error(err);
                req.session.message = {
                    type: 'danger',
                    message: 'Erro ao atualizar a função.'
                };
                res.redirect('/funcao');
            } else {
                if (result.affectedRows === 0) {
                    req.session.message = {
                        type: 'warning',
                        message: 'Função não encontrada.'
                    };
                } else {
                    req.session.message = {
                        type: 'success',
                        message: 'Função atualizada com sucesso!'
                    };
                }
                res.redirect('/funcao');
            }
        });
    });

// Página DELETE
router.get('/funcao/delete/:idFuncao', (req, res) => {
    let idFuncao = req.params.idFuncao;
    const query = 'DELETE FROM tbFuncao WHERE idFuncao = ?';

    connection.query(query, [idFuncao], (err, result) => {
        if (err) {
            console.error(err);
            res.json({ message: err.message });
        } else {
            if (result.affectedRows === 0) {
                req.session.message = {
                    type: 'warning',
                    message: 'Função não encontrada.'
                };
            } else {
                req.session.message = {
                    type: 'info',
                    message: 'Função deletada com sucesso!'
                };
            }
            res.redirect('/funcao');
        }
    });
});



    // Operações CANDIDATO
    router.get('/candidato', (req, res) => {
        res.send("Candidatos");
    });

    return router;
};
