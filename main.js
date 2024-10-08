require('dotenv').config();
console.log('Database Host:', process.env.HOST);
console.log('Database User:', process.env.USER);
console.log('Database Password:', process.env.PASSWORD ? 'Loaded' : 'Not Loaded');
console.log('Database Name:', process.env.DATABASE);
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');

    //Máscaras manuais (antigas, talvez úteis depois)
// const { formatCNPJ } = require('./utils/utils');
// const { formatCPF } = require('./utils/utils');
// const { formatRG } = require('./utils/utils');
// const { formatValor } = require('./utils/utils');
// const { formatCEP } = require('./utils/utils');

const app = express();
const PORT = process.env.PORT || 4000;
    // Máscaras manuais (antigas, talvez úteis depois)
// //Disponibiliza máscara do CNPJ - Tabela
// app.locals.formatCNPJ = formatCNPJ;

// //Disponibiliza máscara do CPF - Tabela
// app.locals.formatCPF = formatCPF;

// //Disponibiliza máscara do RG - Tabela
// app.locals.formatRG = formatRG;

// //Disponibiliza máscara do CEP - Tabela
// app.locals.formatCEP = formatCEP;

// //Disponibiliza conversão do valor em Real - Tabela
// app.locals.formatValor = formatValor;

// Conexão do banco de dados
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

console.log('Connecting to database with:', {
    host: process.env.HOST,
    user: process.env.USER,
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
