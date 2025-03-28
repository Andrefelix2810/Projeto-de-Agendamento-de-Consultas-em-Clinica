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






document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("#sidebar-wrapper .list-group-item");
    const sections = document.querySelectorAll(".content-section");

    // Exibe apenas a seção "Início" no carregamento
    sections.forEach(section => section.style.display = "none");
    document.getElementById("inicio").style.display = "block";

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            // Obtém o ID da seção correspondente
            const sectionId = this.getAttribute("data-section");

            // Verifica se o ID da seção existe
            if (sectionId) {
                // Oculta todas as seções antes de mostrar a nova
                sections.forEach(section => {
                    section.style.display = "none";

                    // Redefine o estilo do <figure> dentro de #inicio
                    if (section.id === "inicio") {
                        const figure = section.querySelector("figure");
                        if (figure) {
                            figure.style.display = "none";
                        }
                    }
                });

                // Exibe a seção selecionada
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    targetSection.style.display = "block";

                    // Restaura o estilo do <figure> dentro de #inicio, se necessário
                    if (sectionId === "inicio") {
                        const figure = targetSection.querySelector("figure");
                        if (figure) {
                            figure.style.display = "flex";
                        }
                    }
                } else {
                    console.error(`Seção com ID "${sectionId}" não encontrada.`);
                }
            }
        });
    });
});

//lita dados dos medicos
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar médicos do backend
    function carregarMedicos() {
        fetch("http://localhost:8080/medicos") // Certifique-se de que a URL está correta
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar médicos");
                }
                return response.json();
            })
            .then(medicos => {
                const informacoesSection = document.getElementById("informacoes");
                const listaMedicos = document.createElement("ul");
                listaMedicos.classList.add("lista-medicos");

                // Adiciona cada médico à lista
                medicos.forEach(medico => {
                    const item = document.createElement("li");
                    item.textContent = `Nome: ${medico.nome}, Especialidade: ${medico.especialidade}, Horário: ${medico.horarioInicio} - ${medico.horarioFim}`;
                    listaMedicos.appendChild(item);
                });

                // Adiciona a lista à seção de informações
                informacoesSection.appendChild(listaMedicos);
            })
            .catch(error => {
                console.error("Erro ao carregar médicos:", error);
            });
    }

    // Chama a função ao carregar a página
    carregarMedicos();
});


//listar agendamentos
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar agendamentos do backend
    function carregarAgendamentos() {
        fetch("http://localhost:8080/atendimentos") // Certifique-se de que a URL está correta
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar agendamentos");
                }
                return response.json();
            })
            .then(atendimentos => {
                const agendamentosSection = document.getElementById("agendamentos");
                const listaAgendamentos = document.createElement("ul");
                listaAgendamentos.classList.add("lista-agendamentos");

                // Adiciona cada agendamento à lista
                atendimentos.forEach(atendimento => {
                    const item = document.createElement("li");
                    item.textContent = `Especialidade: ${atendimento.especialidade}, Data: ${atendimento.data}, Hora: ${atendimento.hora}, Sala: ${atendimento.sala}`;
                    listaAgendamentos.appendChild(item);
                });

                // Adiciona a lista à seção de agendamentos
                agendamentosSection.appendChild(listaAgendamentos);
            })
            .catch(error => {
                console.error("Erro ao carregar agendamentos:", error);
            });
    }

    // Chama a função ao carregar a página
    carregarAgendamentos();
});