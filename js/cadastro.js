document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cadastrar').addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;

        fetch('http://localhost:8080/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                endereco: endereco,
                telefone: telefone
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar paciente');
            }
            return response.json();
        })
        .then(result => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = '<i class="fas fa-check-circle" style="color: green; font-size: 24px;"></i>';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar paciente.');
        });
    });
});