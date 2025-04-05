document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cadastrar').addEventListener('click', function () {
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('senha').value;
        const telefone = document.getElementById('telefone').value;

        fetch('http://localhost:8080/usuarios/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                senha: senha,
                telefone: telefone
            })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro no cadastro');
            return response.json();
        })
        .then(data => {
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao cadastrar usuário.');
        });
    });
});
