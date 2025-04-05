function carregarPacientes() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Usuário não autenticado. Faça login novamente.');
        window.location.href = 'login.html';
        return;
    }

    fetch('http://localhost:8080/perfil', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (response.status === 403 || response.status === 401) {
            throw new Error('Token expirado ou inválido. Faça login novamente.');
        }
        if (!response.ok) {
            throw new Error('Erro ao buscar pacientes. Tente novamente mais tarde.');
        }
        return response.json();
    })
    .then(pacientes => {
        const tabela = document.querySelector('#tabela-pacientes tbody');
        tabela.innerHTML = '';

        if (pacientes.length === 0) {
            tabela.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum paciente encontrado.</td></tr>';
            return;
        }

        pacientes.forEach(p => {
            const row = `
                <tr>
                    <td>${p.nome}</td>
                    <td>${p.dataNascimento}</td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone}</td>
                    <td>${p.sexo}</td>
                    <td>
                        <button class="btn btn-sm btn-primary">Editar</button>
                    </td>
                </tr>
            `;
            tabela.innerHTML += row;
        });
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}
