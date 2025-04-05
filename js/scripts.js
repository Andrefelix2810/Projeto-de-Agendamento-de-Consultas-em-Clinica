document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));

    // Protege acesso se não estiver logado
    if (!token) {
        alert("Você precisa estar logado.");
        window.location.href = "login.html";
        return;
    }

    // ----------- AGENDAR CONSULTA -----------
    const btnAgendar = document.getElementById("agendar");
    if (btnAgendar) {
        btnAgendar.addEventListener("click", function () {
            const especialidade = document.getElementById("especialidade").value;
            const data = document.getElementById("data").value;
            const hora = document.getElementById("hora").value;

            fetch("http://localhost:8080/medicos/agendar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Bearer ${token}`
                },
                body: `especialidade=${especialidade}&data=${data}&hora=${hora}`
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(msg => {
                        if (msg.includes("cadastre um paciente")) {
                            alert("Você precisa cadastrar um paciente antes de agendar.");
                            window.location.href = "cadastro.html";
                        } else {
                            throw new Error(msg);
                        }
                    });
                }
                return response.text();
            })
            .then(result => {
                document.getElementById("resultado").textContent = result;
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao agendar consulta.");
            });
        });
    }

    // ----------- MENU LATERAL -----------
    const menuItems = document.querySelectorAll("#sidebar-wrapper .list-group-item");
    const sections = document.querySelectorAll(".content-section");

    sections.forEach(section => section.style.display = "none");
    document.getElementById("inicio").style.display = "block";

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute("data-section");

            if (sectionId) {
                sections.forEach(section => {
                    section.style.display = "none";
                    if (section.id === "inicio") {
                        const figure = section.querySelector("figure");
                        if (figure) figure.style.display = "none";
                    }
                });

                const target = document.getElementById(sectionId);
                if (target) {
                    target.style.display = "block";
                    if (sectionId === "inicio") {
                        const figure = target.querySelector("figure");
                        if (figure) figure.style.display = "flex";
                    }
                }
            }
        });
    });

    // ----------- LISTAR MÉDICOS -----------
    function carregarMedicos() {
        fetch("http://localhost:8080/medicos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar médicos");
            return response.json();
        })
        .then(medicos => {
            const informacoesSection = document.getElementById("informacoes");
            const listaMedicos = document.createElement("ul");
            listaMedicos.classList.add("lista-medicos");

            medicos.forEach(medico => {
                const item = document.createElement("li");
                item.textContent = `Nome: ${medico.nome}, Especialidade: ${medico.especialidade}, Horário: ${medico.horarioInicio} - ${medico.horarioFim}`;
                listaMedicos.appendChild(item);
            });

            informacoesSection.appendChild(listaMedicos);
        })
        .catch(error => console.error("Erro ao carregar médicos:", error));
    }

    carregarMedicos();

    // ----------- LISTAR AGENDAMENTOS -----------
    function carregarAgendamentos() {
        fetch("http://localhost:8080/atendimentos", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao buscar agendamentos");
            return response.json();
        })
        .then(atendimentos => {
            const section = document.getElementById("agendamentos");
            const lista = document.createElement("ul");
            lista.classList.add("lista-agendamentos");

            atendimentos.forEach(at => {
                const item = document.createElement("li");
                item.textContent = `Especialidade: ${at.especialidade}, Data: ${at.data}, Hora: ${at.hora}, Sala: ${at.sala}`;
                lista.appendChild(item);
            });

            section.appendChild(lista);
        })
        .catch(error => console.error("Erro ao carregar agendamentos:", error));
    }

    carregarAgendamentos();

    // ----------- CADASTRAR PACIENTE -----------
    const btnCadastrar = document.getElementById("cadastrar");
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", function () {
            const nome = document.getElementById("nome").value;
            const cpf = document.getElementById("cpf").value;
            const endereco = document.getElementById("endereco").value;
            const telefone = document.getElementById("telefone").value;

            fetch("http://localhost:8080/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: nome,
                    cpf: cpf,
                    endereco: endereco,
                    telefone: telefone
                })
            })
            .then(response => {
                if (!response.ok) throw new Error("Erro ao cadastrar paciente");
                return response.json();
            })
            .then(result => {
                document.getElementById("resultado").innerHTML =
                    '<i class="fas fa-check-circle" style="color: green; font-size: 24px;"></i>';
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Erro ao cadastrar paciente.");
            });
        });
    }

    // ----------- CARREGAR PACIENTES -----------


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
            const tabela = document.getElementById('tabela-pacientes');
            tabela.innerHTML = '';
    
            if (pacientes.length === 0) {
                tabela.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum paciente encontrado.</td></tr>';
                return;
            }
    
            pacientes.forEach(p => {
                const row = `
                    <tr>
                        <td>${p.nome}</td>
                        <td>${p.cpf}</td>
                        <td>${p.dataNascimento}</td>
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
    
    
});
