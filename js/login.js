document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", function (event) {
        event.preventDefault(); // Impede o recarregamento da página ao submeter o formulário

        const nome = document.getElementById("nome").value;
        const password = document.getElementById("password").value;

        fetch("http://localhost:8080/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: nome,
                password: password,
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    let errorMessage = `Erro ao fazer login: ${response.status} - ${response.statusText}`;

                    // Se a resposta for JSON, tenta extrair detalhes do erro
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        const errorData = await response.json();
                        errorMessage += ` - ${JSON.stringify(errorData)}`;
                    }

                    throw new Error(errorMessage);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Login realizado com sucesso:", result);
                alert("Login realizado com sucesso!");

                // Armazenar o token JWT no localStorage
                localStorage.setItem("authToken", result.token);

                // Redireciona para a página principal (index.html)
                window.location.href = "index.html"; 
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                alert("Erro ao fazer login. Verifique suas credenciais.");
            });
    });
});