document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login').addEventListener('click', function () {
        const nome = document.getElementById('nome').value;
        const senha = document.getElementById('password').value;

        fetch('http://localhost:8080/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, senha: senha })
        })
        .then(response => {
            if (!response.ok) throw new Error('Login inválido');
            return response.json();
        })
        .then(data => {
            const token = data.token;
            localStorage.setItem('token', token);

            // Verifica se o usuário já tem paciente cadastrado
            return fetch('http://localhost:8080/pacientes/existe', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
        })
        .then(response => response.json())
        .then(existePaciente => {
            if (existePaciente) {
                window.location.href = 'index.html';
            } else {
                window.location.href = 'cadastro.html';
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Usuário ou senha inválidos.');
        });
    });
});
