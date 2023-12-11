package com.fisiomais.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fisiomais.bodys.TratamentoResponse;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.exception.NotFoundException;
import com.fisiomais.exception.ServerException;
import com.fisiomais.model.Tratamento;
import com.fisiomais.model.indicators.MidiaUtilizationMetrics;
import com.fisiomais.model.indicators.TaxaTratamentoFisioterapeutaMetrics;
import com.fisiomais.repository.ExercicioRepository;
import com.fisiomais.repository.TratamentoRepository;

@Service
public class TratamentoService {

    private TratamentoRepository tratamentoRepository;
    private ExercicioRepository exercicioRepository;
    private TokenService tokenService;

    public TratamentoService(TratamentoRepository tratamentoRepository, ExercicioRepository exercicioRepository, TokenService tokenService) {
        this.tratamentoRepository = tratamentoRepository;
        this.exercicioRepository = exercicioRepository;
        this.tokenService = tokenService;
    }

    @Transactional
    public TratamentoResponse createTratamento(Tratamento obj) {
        obj = this.tratamentoRepository.save(obj);
        return TratamentoResponse.toTratamentoResponse(obj);

    }

    public List<Tratamento> findByPacienteId(Integer id) {
        List<Tratamento> tratamentos = tratamentoRepository.findByPacienteId(id);
        return tratamentos;
    }

    public List<Tratamento> findByFisioterapeutaId(Integer id) {
        List<Tratamento> tratamentos = tratamentoRepository.findByFisioterapeutaId(id);
        return tratamentos;
    }

    public Tratamento findTratamentoByTitulo(String titulo) {
        Tratamento tratamento = tratamentoRepository.findTratamentoByTitulo(titulo);
        return tratamento;
    }

    @Transactional
    public Tratamento update(Tratamento obj) {
        Optional<Tratamento> newObj = this.tratamentoRepository.findById(obj.getId());
        newObj.get().setTitulo(obj.getTitulo());
        newObj.get().setObservacoes(obj.getObservacoes());
        newObj.get().setEndDate(obj.getEndDate());
        newObj.get().setFeedback(obj.getFeedback());
        return this.tratamentoRepository.save(newObj.get());
    }

    public List<MidiaUtilizationMetrics> getTaxaUtilizacao() {
        try {
            return exercicioRepository.getTaxaUtilizacao();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ServerException("Não foi possível calcular a taxa de utilização das mídias.");
        }
    }

    public List<Tratamento> findByFisioterapeutaIdAndPacienteId(Integer id, Integer idPaciente) {
        Optional<List<Tratamento>> tratamentosOptional = tratamentoRepository.findByFisioterapeutaIdAndPacienteId(id,
                idPaciente);

        return tratamentosOptional
                .orElseThrow(() -> new NotFoundException(
                        "Não foi possível encontrar tratamentos com os parâmetros informados."));
    }

    public Tratamento findById(Integer id) {
        Optional<Tratamento> tratamento = tratamentoRepository.findById(id);
        return tratamento
                .orElseThrow(() -> new NotFoundException(
                        "Não foi possível encontrar tratamento com o id informado."));
    }

    public List<Tratamento> findAll() {
        Optional<List<Tratamento>> tratamentos = Optional.ofNullable(tratamentoRepository.findAll());
        return tratamentos
                .orElseThrow(() -> new NotFoundException(
                        "Não foi possível encontrar tratamentos."));
    }

    public List<TaxaTratamentoFisioterapeutaMetrics> getTaxaCriacaoTratamentosPorFisioterapeuta() {
        List<TaxaTratamentoFisioterapeutaMetrics> taxaTratamentoFisioterapeutaMetrics = tratamentoRepository
                .getTaxaCriacaoTratamentosPorFisioterapeuta();
        return taxaTratamentoFisioterapeutaMetrics;
    }

    public Tratamento updateTratamento(Integer id, Tratamento novoTratamentoMapped) {
        Optional<Tratamento> tratamento = tratamentoRepository.findById(id);
        tratamento.get().setTitulo(novoTratamentoMapped.getTitulo());
        tratamento.get().setObservacoes(novoTratamentoMapped.getObservacoes());
        tratamento.get().setEndDate(novoTratamentoMapped.getEndDate());
        tratamento.get().setFeedback(novoTratamentoMapped.getFeedback());
        return tratamentoRepository.save(tratamento.get());
    }

    public void deleteById(Integer id) {
        tratamentoRepository.deleteById(id);
    }

    public void deleteTratamento(List<Integer> ids, String token) {
       List<Tratamento> existingTratamentos = new ArrayList<>();
        try {
            existingTratamentos.addAll(tratamentoRepository.findAllById(ids));
        } catch (Exception e) {
            throw new NotFoundException("Erro ao buscar tratamentos [" + ids + "]");
        }

        if (existingTratamentos.isEmpty()) {
            throw new NotFoundException("Nenhum tratamento encontrado");
        }

        for (Tratamento tratamento : existingTratamentos) {
            String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));

            if (!tratamento.getFisioterapeuta()
                    .getEmail()
                    .equals(loggedUserEmail)) {
                throw new NotFoundException("Você não pode excluir um tratamento de outro fisioterapeuta");
            }
            try {
                tratamentoRepository.delete(tratamento);
            } catch (Exception e) {
                throw new BusinessException(
                        "Erro ao excluir tratamento de id [" + tratamento.getId() + "]: " + e.getMessage());
            }
        }
    }
}
