package com.consulta.agendamento.controller;

import com.consulta.agendamento.model.Atendimento;
import com.consulta.agendamento.service.AtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atendimentos")
public class AtendimentoController {
    @Autowired
    private AtendimentoService atendimentoService;

    @GetMapping
    public List<Atendimento> listarTodos() {
        return atendimentoService.listarTodos();
    }

    @PostMapping
    public Atendimento salvar(@RequestBody Atendimento atendimento) {
        return atendimentoService.salvar(atendimento);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        atendimentoService.deletar(id);
    }
}
