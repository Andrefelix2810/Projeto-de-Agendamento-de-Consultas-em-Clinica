package com.consulta.agendamento.service;

import com.consulta.agendamento.config.JwtUtil;
import com.consulta.agendamento.model.Atendimento;
import com.consulta.agendamento.model.Paciente;
import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.repository.AtendimentoRepository;
import com.consulta.agendamento.repository.PacienteRepository;
import com.consulta.agendamento.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AtendimentoService {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    public List<Atendimento> listarTodos() {
        return atendimentoRepository.findAll();
    }

    public Atendimento salvar(Atendimento atendimento) {
        String token = extrairToken();
        String nomeUsuario = jwtUtil.extrairUsuario(token);

        Optional<Usuario> usuarioOpt = usuarioRepository.findByNome(nomeUsuario);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        List<Paciente> pacientes = pacienteRepository.findByUsuario(usuario);

        if (pacientes.isEmpty()) {
            throw new RuntimeException("Você precisa cadastrar um paciente antes de registrar atendimentos.");
        }

        atendimento.setPaciente(pacientes.get(0)); // Usa o primeiro paciente vinculado ao usuário
        return atendimentoRepository.save(atendimento);
    }

    public void deletar(Long id) {
        atendimentoRepository.deleteById(id);
    }

    private String extrairToken() {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        throw new RuntimeException("Token JWT ausente");
    }
}
