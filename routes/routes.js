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
                    message: 'Função cadastrada com sucesso!'
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

    //EDIT Função
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

    // Delete FUNÇÃO
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
    // Index
    router.get('/candidato', (req, res) => {
        connection.query('SELECT * FROM tbCandidato', (err, results) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else {
                res.render('candidato/index', { title: 'Candidatos', candidato: results });
            }
        });
    });

        // Página CREATE
        router.get('/candidato/create', (req, res) => {
            res.render('candidato/create', { title: 'Cadastrar Candidato' });
        });

        // Create CANDIDATO
    router.post('/candidato/create', (req, res) => {
        const { nrCandidato, partido, cargo, municipio, nmCandidato, cnpj,
            enderecoCandidato, cidadeCandidato, cepCandidato, cpfAdmFinanceiro, rgAdmFinanceiro, 
            ecAdmFinanceiro, profAdmFinanceiro, nmAdmFinanceiro, enderecoAdmFinanceiro, cidadeAdmFinanceiro, 
            cepAdmFinanceiro, dtInicioCampanha, dtFimCampanha, lmMilitantes, lmVeiculos } = req.body;
        const query = `INSERT INTO tbCandidato (nrCandidato, partido, cargo, municipio, nmCandidato, cnpj,
                        enderecoCandidato, cidadeCandidato, cepCandidato, cpfAdmFinanceiro, rgAdmFinanceiro, 
                        ecAdmFinanceiro, profAdmFinanceiro, nmAdmFinanceiro, enderecoAdmFinanceiro, cidadeAdmFinanceiro, 
                        cepAdmFinanceiro, dtInicioCampanha, dtFimCampanha, lmMilitantes, lmVeiculos ) VALUES (?, ?, ?, ?, ?, ?, 
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(query, [nrCandidato, partido, cargo, municipio, nmCandidato, cnpj,
            enderecoCandidato, cidadeCandidato, cepCandidato, cpfAdmFinanceiro, rgAdmFinanceiro, 
            ecAdmFinanceiro, profAdmFinanceiro, nmAdmFinanceiro, enderecoAdmFinanceiro, cidadeAdmFinanceiro, 
            cepAdmFinanceiro, dtInicioCampanha, dtFimCampanha, lmMilitantes, lmVeiculos], (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message, type: 'danger' });
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'Candidato cadastrado com sucesso!'
                };
                res.redirect('/candidato');
            }
        });
    });
    //View CANDIDATO
    router.get('/candidato/view/:nrCandidato', (req, res) => {
        const nrCandidato = req.params.nrCandidato;
        const query = 'SELECT * FROM tbCandidato WHERE nrCandidato = ?';

        connection.query(query, [nrCandidato], (err, results) => {
            if (err) {
                res.redirect('/');
            } else {
                if (results.length > 0) {
                    res.render('candidato/view', {
                        title: 'Editar Candidato',
                        candidato: results[0]
                    });
                } else {
                    res.redirect('/');
                }
            }
        });
    });

    // Página EDIT
    router.get('/candidato/edit/:nrCandidato', (req, res) => {
        const nrCandidato = req.params.nrCandidato;
        const query = 'SELECT * FROM tbCandidato WHERE nrCandidato = ?';

        connection.query(query, [nrCandidato], (err, results) => {
            if (err) {
                res.redirect('/');
            } else {
                if (results.length > 0) {
                    res.render('candidato/edit', {
                        title: 'Editar Candidato',
                        candidato: results[0]
                    });
                } else {
                    res.redirect('/');
                }
            }
        });
    });

    //EDIT Candidato
router.post('/candidato/edit/:nrCandidato', (req, res) => {
    const originalNrCandidato = req.params.nrCandidato;
    const { nrCandidato, partido, cargo, municipio, nmCandidato, cnpj,
        enderecoCandidato, cidadeCandidato, cepCandidato, cpfAdmFinanceiro, rgAdmFinanceiro, 
        ecAdmFinanceiro, profAdmFinanceiro, nmAdmFinanceiro, enderecoAdmFinanceiro, cidadeAdmFinanceiro, 
        cepAdmFinanceiro, dtInicioCampanha, dtFimCampanha, lmMilitantes, lmVeiculos } = req.body;

    const query = `UPDATE tbCandidato SET nrCandidato = ?, partido = ?, cargo = ?, municipio = ?, nmCandidato = ?, cnpj = ?,
                    enderecoCandidato = ?, cidadeCandidato = ?, cepCandidato = ?, cpfAdmFinanceiro = ?, rgAdmFinanceiro = ?, 
                    ecAdmFinanceiro = ?, profAdmFinanceiro = ?, nmAdmFinanceiro = ?, enderecoAdmFinanceiro = ?, cidadeAdmFinanceiro = ?, 
                    cepAdmFinanceiro = ?, dtInicioCampanha = ?, dtFimCampanha = ?, lmMilitantes = ?, lmVeiculos = ?
                    WHERE nrCandidato = ?`;
    connection.query(query, [nrCandidato, partido, cargo, municipio, nmCandidato, cnpj,
        enderecoCandidato, cidadeCandidato, cepCandidato, cpfAdmFinanceiro, rgAdmFinanceiro, 
        ecAdmFinanceiro, profAdmFinanceiro, nmAdmFinanceiro, enderecoAdmFinanceiro, cidadeAdmFinanceiro, 
        cepAdmFinanceiro, dtInicioCampanha, dtFimCampanha, lmMilitantes, lmVeiculos, originalNrCandidato], (err, result) => {
        if (err) {
            console.error(err);
            req.session.message = {
                type: 'danger',
                message: 'Erro ao atualizar o cadastro de candidato.'
            };
            res.redirect('/candidato');
        } else {
            if (result.affectedRows === 0) {
                req.session.message = {
                    type: 'warning',
                    message: 'Candidato não encontrado.'
                };
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'Cadastro de candidato atualizado com sucesso!'
                };
            }
            res.redirect('/candidato');
        }
    });
});

    // Delete CANDIDATO
    router.get('/candidato/delete/:nrCandidato', (req, res) => {
        let nrCandidato = req.params.nrCandidato;
        const query = 'DELETE FROM tbCandidato WHERE nrCandidato = ?';

        connection.query(query, [nrCandidato], (err, result) => {
            if (err) {
                console.error(err);
                res.json({ message: err.message });
            } else {
                if (result.affectedRows === 0) {
                    req.session.message = {
                        type: 'warning',
                        message: 'Candidato não encontrado.'
                    };
                } else {
                    req.session.message = {
                        type: 'info',
                        message: 'Candidato deletado com sucesso!'
                    };
                }
                res.redirect('/candidato');
            }
        });
    });



    // End point
    return router;
};
