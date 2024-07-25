
document.getElementById('executeQueryBtn').addEventListener('click', function() {
    fetch('/api/candidato/query')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('resultsTable').querySelector('tbody');
            tableBody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${row.id}</td><td>${row.name}</td><td>${row.party}</td><td>${row.votes}</td>`;
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
});
// // Consulta CANDIDATO
// app.get('/candidato', function (req, res) {
//     conn.query('SELECT * FROM tbCandidato', function (err, results, fields) { res.status(200).json(results) })
// })



