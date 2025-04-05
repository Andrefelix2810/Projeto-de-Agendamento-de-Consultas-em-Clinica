package com.consulta.agendamento.repository;

import com.consulta.agendamento.model.Paciente;
import com.consulta.agendamento.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    List<Paciente> findByUsuario(Usuario usuario);
}
