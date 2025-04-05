package com.consulta.agendamento.controller;

import com.consulta.agendamento.config.JwtUtil;
import com.consulta.agendamento.model.Paciente;
import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.repository.PacienteRepository;
import com.consulta.agendamento.repository.UsuarioRepository;
import com.consulta.agendamento.service.PacienteService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Paciente> listarTodos(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extrairUsuario(token.replace("Bearer ", ""));
        Usuario usuario = usuarioRepository.findByNome(username).orElseThrow();
        return pacienteService.listarPorUsuario(usuario);
    }

    @PostMapping
    public Paciente salvar(@RequestBody Paciente paciente, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extrairUsuario(token.replace("Bearer ", ""));
        Usuario usuario = usuarioRepository.findByNome(username).orElseThrow();
        paciente.setUsuario(usuario);
        return pacienteService.salvar(paciente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        pacienteService.deletar(id);
    }

    @GetMapping("/existe")
    public ResponseEntity<Boolean> verificarPaciente(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        String nomeUsuario = jwtUtil.extrairUsuario(token);
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNome(nomeUsuario);

        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Usuario usuario = usuarioOpt.get();
        List<Paciente> pacientes = pacienteRepository.findByUsuario(usuario);
        boolean existePaciente = !pacientes.isEmpty();

        return ResponseEntity.ok(existePaciente);
    }

    @GetMapping("/perfil")
public ResponseEntity<Paciente> obterPerfilPaciente(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    String token = authHeader.substring(7);
    String nomeUsuario = jwtUtil.extrairUsuario(token);
    Optional<Usuario> usuarioOpt = usuarioRepository.findByNome(nomeUsuario);

    if (usuarioOpt.isEmpty()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    Usuario usuario = usuarioOpt.get();
    List<Paciente> pacientes = pacienteRepository.findByUsuario(usuario);

    if (pacientes.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    return ResponseEntity.ok(pacientes.get(0)); // Retorna o primeiro paciente vinculado
}


    
}
