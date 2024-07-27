// Mascara CNPJ
function formatCNPJ(cnpj) {
    return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Conversão Valor em Real
    function formatValor(valor) {
        let value = parseInt(valor, 10).toString();
        while (value.length < 3) value = '0' + value;
        value = value.slice(0, value.length - 2) + ',' + value.slice(value.length - 2);
        return value;
    }

module.exports = {
    formatCNPJ,
    formatValor
};
