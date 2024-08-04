// // // Máscara CNPJ - Tabela
// // function formatCNPJ(cnpj) {
// //     return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
// // }

// //Máscara CPF - Tabela
// function formatCPF(cpfAdmFinanceiro) {
//     return cpfAdmFinanceiro.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
// }

// //Máscara RG - Tabela
// function formatRG(rg) {
//     return rg.replace(/^(\d{2})(\d{3})(\d{3})(\d{1})$/, "$1.$2.$3-$4");
// }

// //Máscara CEP - Tabela
// function formatCEP(cep) {
//     return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
// }

// // Conversão Valor em Real - Tabela
//     function formatValor(valor) {
//         let value = parseInt(valor, 10).toString();
//         while (value.length < 3) value = '0' + value;
//         value = value.slice(0, value.length - 2) + ',' + value.slice(value.length - 2);
//         return value;
//     }

// module.exports = {
//     // formatCNPJ,
//     formatValor,
//     formatCPF,
//     formatCEP,
//     formatRG
// };
