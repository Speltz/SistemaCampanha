require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const { formatCNPJ } = require('./utils/utils');
const { formatValor } = require('./utils/utils');

const app = express();
const PORT = process.env.PORT || 4000;

//Disponibiliza máscara do CNPJ
app.locals.formatCNPJ = formatCNPJ;

//Disponibiliza conversão do valor em Real
app.locals.formatValor = formatValor;

// Conexão do banco de dados
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'chave secreta',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Definir template engine
app.set('view engine', 'ejs');

// Prefixo de rota
const routes = require('./routes/routes')(connection);
app.use("", routes);

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
