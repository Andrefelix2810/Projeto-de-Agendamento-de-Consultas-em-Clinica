package com.consulta.agendamento.repository;

import com.consulta.agendamento.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
}