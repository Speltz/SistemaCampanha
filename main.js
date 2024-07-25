require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

// Conexão do banco de dados
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Conectado ao banco de dados"));

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'chave secreta',
    saveUninitialized: true,
    resave: false,
})
);

app.use((req, res, next) => {res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

//Definir template engine
app.set('view engine', 'ejs');

//Prefixo de rota
app.use("", require("./routes/routes"));

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})