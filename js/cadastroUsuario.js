const formCadastro = document.getElementById("form-cadastro");

formCadastro.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obter os valores dos campos
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar-senha").value;
    const grupo = document.getElementById("grupo").value;

    // Verificar se todos os campos estão preenchidos
    if (!nome || !cpf || !email || !senha || !confirmarSenha || !grupo) {
        console.error('Erro: Todos os campos devem ser preenchidos.');
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verificar se as senhas coincidem
    if (senha !== confirmarSenha) {
        console.error('Erro: As senhas não coincidem.');
        alert('As senhas não coincidem!');
        return;
    }

    // Criar um objeto com os dados do usuário
    const usuario = {
        nome,
        cpf,
        email,
        senha,
        grupo,
        ativo: true
    };

    console.log('Enviando dados para o servidor:', usuario);

    // Chamar a API para fazer o cadastro
    fetch("http://localhost:8080/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            console.error(`Erro: Resposta do servidor não OK. Status: ${response.status}`);
            return response.json().then(error => {
                console.error('Erro de resposta JSON:', error);
                throw new Error(error.message || "Erro ao cadastrar usuário");
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Cadastro realizado com sucesso:', data);
        alert('Usuário cadastrado com sucesso!');
        // Redirecionar ou limpar o formulário após o cadastro bem-sucedido
        formCadastro.reset();
        // Exemplo de redirecionamento:
        // window.location.href = "/usuarios";  // redireciona para a lista de usuários, se necessário
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        alert(error.message || "Erro ao cadastrar usuário");
    });
});
