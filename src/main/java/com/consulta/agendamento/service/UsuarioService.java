package com.consulta.agendamento.service;

import com.consulta.agendamento.model.Usuario;
import com.consulta.agendamento.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> autenticar(String nome, String senha) {
        return usuarioRepository.findByNome(nome)
                .filter(u -> u.getSenha().equals(senha));
    }
}
