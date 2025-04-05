package com.consulta.agendamento.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.consulta.agendamento.config.JwtUtil;
import com.consulta.agendamento.model.Paciente;
import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.repository.PacienteRepository;
import com.consulta.agendamento.repository.UsuarioRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    public List<Paciente> listarTodos() {
        return pacienteRepository.findAll();
    }

    public List<Paciente> listarPorUsuario(Usuario usuario) {
        return pacienteRepository.findByUsuario(usuario);
    }

    public Paciente salvar(Paciente paciente) {
        String token = extrairTokenSeExistir(request);

        if (token != null) {
            String nomeUsuario = jwtUtil.extrairUsuario(token);
            Optional<Usuario> usuarioOpt = usuarioRepository.findByNome(nomeUsuario);
            if (usuarioOpt.isPresent()) {
                paciente.setUsuario(usuarioOpt.get());
            } else {
                throw new RuntimeException("Usuário não encontrado");
            }
        }

        return pacienteRepository.save(paciente);
    }

    public void deletar(Long id) {
        pacienteRepository.deleteById(id);
    }

    private String extrairTokenSeExistir(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }
}