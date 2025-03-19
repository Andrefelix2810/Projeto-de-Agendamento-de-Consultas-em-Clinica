package com.consulta.agendamento.service;

import com.consulta.agendamento.model.Atendimento;
import com.consulta.agendamento.repository.AtendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtendimentoService {
    @Autowired
    private AtendimentoRepository atendimentoRepository;

    public List<Atendimento> listarTodos() {
        return atendimentoRepository.findAll();
    }

    public Atendimento salvar(Atendimento atendimento) {
        return atendimentoRepository.save(atendimento);
    }

    public void deletar(Long id) {
        atendimentoRepository.deleteById(id);
    }
}
