document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cadastrar').addEventListener('click', function () {
        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;

        const token = localStorage.getItem('token');

        if (!token) {
            alert('Você precisa estar logado para cadastrar um paciente.');
            return;
        }

        fetch('http://localhost:8080/pacientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                endereco: endereco,
                telefone: telefone
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao cadastrar paciente');
            return response.json();
        })
        .then(result => {
            // Exibe ícone de sucesso
            document.getElementById('resultado').innerHTML = 
                '<i class="fas fa-check-circle" style="color: green; font-size: 24px;"></i>';

            // Redireciona após pequeno delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar paciente.');
        });
    });
});
