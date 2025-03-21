document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const token = localStorage.getItem('authToken'); // Supondo que o token esteja armazenado no localStorage

    document.getElementById('agendar').addEventListener('click', function() {
        const especialidade = document.getElementById('especialidade').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('hora').value;

        fetch('http://localhost:8080/medicos/agendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: `especialidade=${especialidade}&data=${data}&hora=${hora}`
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao agendar consulta');
            }
            return response.text();
        })
        .then(result => {
            document.getElementById('resultado').textContent = result;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao agendar consulta.');
        });
    });
});