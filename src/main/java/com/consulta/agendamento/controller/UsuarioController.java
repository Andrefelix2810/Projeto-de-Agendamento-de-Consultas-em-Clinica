package com.consulta.agendamento.controller;

import com.consulta.agendamento.config.JwtUtil;
import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/cadastro")
    public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.salvar(usuario));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario) {
        System.out.println("Tentativa de login: " + usuario.getNome() + " / " + usuario.getSenha());
    
        Optional<Usuario> autenticado = usuarioService.autenticar(usuario.getNome(), usuario.getSenha());
    
        if (autenticado.isPresent()) {
            String token = jwtUtil.gerarToken(usuario.getNome());
            Map<String, String> resposta = new HashMap<>();
            resposta.put("token", token);
            return ResponseEntity.ok(resposta);
        } else {
            System.out.println("Credenciais inválidas.");
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }
    }
    
}