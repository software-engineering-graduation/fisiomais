package com.fisiomais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fisiomais.bodys.ExercicioRequest;
import com.fisiomais.bodys.ExercicioResponse;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.ExercicioService;
import com.fisiomais.service.TokenService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercicio")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Exercícios", description = "Endpoint para gerenciar exercícios controlados pelos fisioterapeutas")
public class ExercicioController {

    private final ExercicioService exercicioService;
    private final FisioterapeutaRepository fisioterapeutaRepository;
    private final TokenService tokenService;
    private static final Logger logger = LogManager.getLogger(ExercicioController.class);

    public ExercicioController(ExercicioService exercicioService, FisioterapeutaRepository fisioterapeutaRepository,
            TokenService tokenService) {
        this.exercicioService = exercicioService;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
        this.tokenService = tokenService;
    }

    @GetMapping
    @Operation(summary = "Obter todas os exercícios", description = "Obter uma lista de todos os exercícios disponíveis.")
    public ResponseEntity<List<ExercicioResponse>> getAllExercicios(@RequestHeader("Authorization") String token) {
        List<ExercicioResponse> midias = ExercicioResponse
                .toExercicioResponse(exercicioService.getAllExercicios(token));
        return new ResponseEntity<>(midias, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter exercício por ID", description = "Obter um exercício específico pelo seu ID.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Exercício não encontrado")
    public ResponseEntity<ExercicioResponse> getExercicioById(@PathVariable Integer id,
            @RequestHeader("Authorization") String token) {
        ExercicioResponse optionalExercicio = exercicioService.getExercicioById(id, token);
        return new ResponseEntity<>(optionalExercicio, HttpStatus.OK);
    }

    @GetMapping("/owner/{id}")
    @Operation(summary = "Obter exercícios por ID do Fisioterapeuta", description = "Obter exercícios associados a um Fisioterapeuta específico pelo seu ID.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Fisioterapeuta não encontrado")
    public ResponseEntity<List<ExercicioResponse>> getExercicioByFisioterapeuta(@PathVariable Integer id,
            @RequestHeader("Authorization") String token) {
        Optional<Fisioterapeuta> optionalFisioterapeuta = fisioterapeutaRepository.findById(id);

        if (optionalFisioterapeuta.isPresent()) {
            Fisioterapeuta fisioterapeuta = optionalFisioterapeuta.get();
            List<ExercicioResponse> exercicioList = exercicioService.getExercicioByFisioterapeuta(fisioterapeuta,
                    token);
            return new ResponseEntity<>(exercicioList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/available")
    @Operation(summary = "Obter exercícios públicos e do Fisioterapeuta", description = "Obter exercícios públicos e do Fisioterapeuta logado.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Fisioterapeuta não encontrado")
    public ResponseEntity<List<ExercicioResponse>> getExercicioByFisioterapeuta(
            @RequestHeader("Authorization") String token) {
        String loggedUserEmail = tokenService.getSubject(tokenService.getTokenFromBearer(token));
        Fisioterapeuta fisioterapeuta = fisioterapeutaRepository.findByEmail(loggedUserEmail);
        if (fisioterapeuta == null) {
            new BusinessException("Seu usuário não tem permissão para acessar esse recurso.");
        }

        List<ExercicioResponse> exercicioList = exercicioService.getAvailableExercises(token, fisioterapeuta);
        return new ResponseEntity<>(exercicioList, HttpStatus.OK);
    }

    @GetMapping("/public")
    @Operation(summary = "Obter exercícios públicos", description = "Obter exercícios públicos.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Fisioterapeuta não encontrado")
    public ResponseEntity<List<ExercicioResponse>> getExercicioByFisioterapeuta() {
        List<ExercicioResponse> exercicioList = exercicioService.getPublicExercises();
        return new ResponseEntity<>(exercicioList, HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Criar novo exercício", description = "Criar um novo item de exercício e retornar o exercício criado.")
    @ApiResponse(responseCode = "201", description = "Exercício criado com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados de exercício inválidos fornecidos")
    public ResponseEntity<ExercicioResponse> createExercicio(@RequestBody ExercicioRequest exercicio,
            @RequestHeader("Authorization") String token) {
        ExercicioResponse createdExercicio = exercicioService.createExercicio(exercicio, token);
        return new ResponseEntity<>(createdExercicio, HttpStatus.CREATED);
    }

    @DeleteMapping("/{ids}")
    @Operation(summary = "Excluir exercícios", description = "Excluir um ou mais itens de exercício com base nos seus IDs.")
    @ApiResponse(responseCode = "200", description = "Exercício excluído com sucesso")
    @ApiResponse(responseCode = "404", description = "Exercício não encontrado")
    public ResponseEntity<Void> deleteExercicio(@PathVariable List<Integer> ids,
            @RequestHeader("Authorization") String token) {
        System.out.println("Deleting exercicio with IDs: " + ids);
        if (ids == null || ids.isEmpty()) {
            throw new BusinessException("No exercicio IDs provided. Accepted format: /exercicio/12,78,5,4,1,2");
        }
        exercicioService.deleteExercicio(ids, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
