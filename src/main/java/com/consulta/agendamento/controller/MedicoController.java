package com.consulta.agendamento.controller;

import com.consulta.agendamento.config.JwtUtil;
import com.consulta.agendamento.model.Atendimento;
import com.consulta.agendamento.model.Medico;
import com.consulta.agendamento.model.Paciente;
import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.repository.PacienteRepository;
import com.consulta.agendamento.repository.UsuarioRepository;
import com.consulta.agendamento.service.AtendimentoService;
import com.consulta.agendamento.service.MedicoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @Autowired
    private AtendimentoService atendimentoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Medico> listarTodos() {
        return medicoService.listarTodos();
    }

    @PostMapping
    public Medico salvar(@RequestBody Medico medico) {
        return medicoService.salvar(medico);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        medicoService.deletar(id);
    }

    @PostMapping("/agendar")
    public String agendarConsulta(@RequestParam String especialidade,
                                  @RequestParam String data,
                                  @RequestParam String hora,
                                  @RequestHeader("Authorization") String token) {

        String username = jwtUtil.extrairUsuario(token.replace("Bearer ", ""));
        Usuario usuario = usuarioRepository.findByNome(username).orElseThrow();

        List<Paciente> pacientes = pacienteRepository.findByUsuario(usuario);
        if (pacientes.isEmpty()) {
            return "Você precisa cadastrar um paciente antes de agendar uma consulta.";
        }

        Paciente paciente = pacientes.get(0); // Assume primeiro paciente vinculado

        LocalDate dataConsulta = LocalDate.parse(data);
        LocalTime horario = LocalTime.parse(hora);
        List<Medico> medicos = medicoService.listarTodos();

        for (Medico medico : medicos) {
            if (medico.getEspecialidade().equals(especialidade) &&
                !horario.isBefore(medico.getHorarioInicio()) &&
                !horario.isAfter(medico.getHorarioFim())) {

                Atendimento atendimento = new Atendimento();
                atendimento.setEspecialidade(especialidade);
                atendimento.setTelefone(medico.getTelefone());
                atendimento.setData(dataConsulta);
                atendimento.setHora(horario);
                atendimento.setSala(medico.getSala());
                atendimento.setPaciente(paciente); // Vincula paciente autenticado

                atendimentoService.salvar(atendimento);

                return "Consulta agendada com " + medico.getNome() + " às " + hora + " no dia " + data + " na sala " + medico.getSala();
            }
        }

        return "Nenhum médico disponível para o horário selecionado.";
    }
}
