package com.fisiomais.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.swing.Spring;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fisiomais.bodys.ExercicioRequest;
import com.fisiomais.bodys.ExercicioResponse;
import com.fisiomais.bodys.MidiaTratamentoResponse;
import com.fisiomais.controller.ConsultaController;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.exception.NotFoundException;
import com.fisiomais.model.Exercicio;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Midia;
import com.fisiomais.repository.ExercicioRepository;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.repository.MidiaRepository;
import com.fisiomais.repository.TratamentoRepository;

@Service
public class ExercicioService {
    private final ExercicioRepository exercicioRepository;
    private final MidiaRepository midiaRepository;
    private final TratamentoRepository tratamentoRepository;
    private final FisioterapeutaRepository fisioterapeutaRepository;
    private final TokenService tokenService;
    private static final Logger logger = LogManager.getLogger(ExercicioService.class);

    public ExercicioService(ExercicioRepository exercicioRepository,
            MidiaRepository midiaRepository,
            TokenService tokenServices,
            TratamentoRepository tratamentoRepository,
            FisioterapeutaRepository fisioterapeutaRepository) {
        this.exercicioRepository = exercicioRepository;
        this.midiaRepository = midiaRepository;
        this.tokenService = tokenServices;
        this.tratamentoRepository = tratamentoRepository;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
    }

    public List<Exercicio> findExerciciosByMidia(Midia midia) {
        return exercicioRepository.findExerciciosByMidia(midia);
    }

    public void deleteMidia(Exercicio exercicio, Midia midia) {
        Exercicio exercicioToDelete = exercicioRepository.findById(exercicio.getId()).orElseThrow();
        exercicioToDelete.getMidias().remove(midia);
        exercicioRepository.save(exercicioToDelete);
    }

    public List<Exercicio> getAllExercicios(String token) {
        String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));
        if (loggedUserEmail.equals("fisiomaisclinicas@gmail.com")) {
            logger.info("Buscando todos os exercícios  para o administrador");
            return exercicioRepository.findAll();
        }

        throw new BusinessException("Você não tem permissão para acessar esse recurso");
    }

    public List<ExercicioResponse> getExercicioByFisioterapeuta(Fisioterapeuta fisioterapeuta, String token) {
        String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));
        logger.info("compare: " + loggedUserEmail + " " + fisioterapeuta.getEmail());
        if (loggedUserEmail.equals(fisioterapeuta.getEmail())
                || loggedUserEmail.equals("fisiomaisclinicas@gmail.com")) {
            return ExercicioResponse
                    .toExercicioResponse(exercicioRepository
                            .findExerciciosByFisioterapeuta(fisioterapeuta));
        }
        throw new BusinessException("Você não tem permissão para acessar esse recurso");
    }

    public ExercicioResponse getExercicioById(Integer id, String token) {
        String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));
        Optional<Exercicio> exercicio = exercicioRepository.findById(id);
        if (exercicio.isPresent()) {
            if (loggedUserEmail.equals("fisiomaisclinicas@gmail.com")
                    || loggedUserEmail.equals(exercicio.get().getFisioterapeuta().getEmail())) {
                return ExercicioResponse.toExercicioResponse(exercicio.get());
            }
            throw new BusinessException("Você não tem permissão para acessar esse recurso");
        }

        throw new NotFoundException("Exercicio de id " + id + " não encontrado");
    }

    public ExercicioResponse createExercicio(ExercicioRequest exercicioDTO, String token) {
        String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));
        List<Midia> midias = new ArrayList<>();
        if (!exercicioDTO.midias().isEmpty()) {
            try {
                midias.addAll(midiaRepository.findAllById(exercicioDTO.midias()));
            } catch (Exception e) {
                throw new NotFoundException("Erro ao buscar midias [" + exercicioDTO.midias() + "]");
            }


            if (midias.stream()
                    .anyMatch(midia -> !midia.getFisioterapeuta().getEmail().equals(loggedUserEmail)) &&
                    midias.stream()
                            .anyMatch(midia -> !midia.getIsPublic())) {
                throw new NotFoundException(
                        "Você não pode criar um exercício com mídias de outro fisioterapeuta sem que elas estejam públicas");
            }
        }

        Fisioterapeuta fisioterapeuta = null;
        if(!exercicioDTO.midias().isEmpty()) {
            fisioterapeuta = midias.get(0).getFisioterapeuta();
        } else {
            fisioterapeuta = fisioterapeutaRepository.findByEmail(loggedUserEmail);
        }

        Exercicio exercicio = ExercicioRequest.toEntity(exercicioDTO, fisioterapeuta, midias);

        Exercicio savedExercicio = exercicioRepository.save(exercicio);

        if (savedExercicio == null) {
            throw new BusinessException("Erro ao salvar exercício");
        }

        return ExercicioResponse.toExercicioResponse(savedExercicio);
    }

    @Transactional
    public void deleteExercicio(List<Integer> ids, String token) {
        List<Exercicio> existingExercicios = new ArrayList<>();
        try {
            existingExercicios.addAll(exercicioRepository.findAllById(ids));
            logger.info("Exercicios encontrados: " + existingExercicios);
        } catch (Exception e) {
            throw new NotFoundException("Erro ao buscar exercícios [" + ids + "]");
        }

        if (existingExercicios.isEmpty()) {
            throw new NotFoundException("Nenhum exercício encontrado");
        }

        for (Exercicio exercicio : existingExercicios) {
            String loggedUserEmail = this.tokenService.getSubject(this.tokenService.getTokenFromBearer(token));

            if (!exercicio.getFisioterapeuta()
                    .getEmail()
                    .equals(loggedUserEmail)) {
                throw new NotFoundException("Você não pode excluir um exercício de outro fisioterapeuta");
            }
            try {
                tratamentoRepository.deleteTratamentoHasExerciciosByExercicios(exercicio);
                exercicioRepository.delete(exercicio);
            } catch (Exception e) {
                throw new BusinessException(
                        "Erro ao excluir exercício de id [" + exercicio.getId() + "]: " + e.getMessage());
            }
        }
    }

    public List<ExercicioResponse> getAvailableExercises(String token, Fisioterapeuta fisioterapeuta) {
        if (this.tokenService.isAdmin(token)) {
            return ExercicioResponse.toExercicioResponse(exercicioRepository.findAll());
        }

        List<ExercicioResponse> exerciciosFisioterapeuta = this.getExercicioByFisioterapeuta(fisioterapeuta, token);
        List<ExercicioResponse> exerciciosPublicos = ExercicioResponse
                .toExercicioResponse(exercicioRepository.findAllByIsPublicTrue());
        List<ExercicioResponse> groupedList = new ArrayList<>();
        groupedList.addAll(exerciciosFisioterapeuta);
        groupedList.addAll(exerciciosPublicos);

        return groupedList
                .stream()
                .distinct()
                .sorted((e1, e2) -> e1.id().compareTo(e2.id()))
                .toList();
    }

    public List<ExercicioResponse> getPublicExercises() {
        return ExercicioResponse
                .toExercicioResponse(exercicioRepository.findAllByIsPublicTrue());
    }
}