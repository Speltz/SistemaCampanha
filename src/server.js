const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const conn = require('./config/bd'); // Ensure this file exports a MySQL connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html in the Candidato folder
app.get('Operacoes/Candidato/Index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Candidato', 'Index.html'));
});

// Serve the script.js file
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

// Add the new route to handle the SQL query
app.get('/api/candidato/query', function (req, res) {
    conn.query('SELECT * FROM tbCandidato', function (err, results, fields) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(5000, function () {
    console.log('Sistema para eleição está rodando na porta 5000!');
});
