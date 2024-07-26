const mongoose = require('mongoose');
const funcaoSchema = new mongoose.Schema({
    nmFuncao:{
        type: String,
        required: true,
    },
    dsFuncao:{
        type: String,
        required: true
    },
    tpContrato:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Funcao', funcaoSchema);