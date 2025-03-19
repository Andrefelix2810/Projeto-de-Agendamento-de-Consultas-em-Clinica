package com.consulta.agendamento.service;

import com.consulta.agendamento.model.Medico;
import com.consulta.agendamento.repository.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {
    @Autowired
    private MedicoRepository medicoRepository;

    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    public Medico salvar(Medico medico) {
        return medicoRepository.save(medico);
    }

    public void deletar(Long id) {
        medicoRepository.deleteById(id);
    }
}