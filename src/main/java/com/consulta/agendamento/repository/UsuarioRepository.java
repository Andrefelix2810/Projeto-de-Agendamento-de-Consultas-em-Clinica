package com.consulta.agendamento.repository;

import com.consulta.agendamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
