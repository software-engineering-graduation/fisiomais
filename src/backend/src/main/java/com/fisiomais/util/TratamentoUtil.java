package com.fisiomais.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fisiomais.bodys.NovoTratamentoRequest;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Exercicio;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Paciente;
import com.fisiomais.model.Tratamento;
import com.fisiomais.repository.ExercicioRepository;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.repository.PacienteRepository;

@Service
public class TratamentoUtil {
    private final PacienteRepository pacienteRepository;
    private final FisioterapeutaRepository fisioterapeutaRepository;
    private final ExercicioRepository exercicioRepository;

    @Autowired
    public TratamentoUtil(PacienteRepository pacienteRepository, FisioterapeutaRepository fisioterapeutaRepository,
            ExercicioRepository exercicioRepository) {
        this.pacienteRepository = pacienteRepository;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
        this.exercicioRepository = exercicioRepository;
    }

    public Tratamento convertToTratamento(NovoTratamentoRequest tratamento) {
        System.out.println("NovoTratamentoRequest: " + tratamento);
        Paciente paciente = pacienteRepository.findById(tratamento.pacienteId())
                .orElseThrow(() -> new BusinessException("Paciente não encontrado"));
        Fisioterapeuta fisioterapeuta = fisioterapeutaRepository.findById(tratamento.fisioterapeutaId())
                .orElseThrow(() -> new BusinessException("Fisioterapeuta não encontrado"));
        Exercicio exercicio = exercicioRepository.findById(tratamento.fisioterapeutaId())
                .orElseThrow(() -> new BusinessException("Fisioterapeuta não encontrado"));
        List<Exercicio> listaExercicios = new ArrayList<>();
        listaExercicios.add(exercicio);

        Tratamento novoTratamento = new Tratamento();
        novoTratamento.setPaciente(paciente);
        novoTratamento.setFisioterapeuta(fisioterapeuta);
        novoTratamento.setExercicios(listaExercicios);
        novoTratamento.setEndDate(tratamento.endDate());
        novoTratamento.setTitulo(tratamento.titulo());
        novoTratamento.setFeedback(tratamento.feedback());
        novoTratamento.setObservacoes(tratamento.observacoes());

        return novoTratamento;
    }
}
