package com.consulta.agendamento.repository;

import com.consulta.agendamento.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
}