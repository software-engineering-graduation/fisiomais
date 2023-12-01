package com.fisiomais.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fisiomais.bodys.ExercicioRequest;
import com.fisiomais.bodys.ExercicioResponse;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.ExercicioService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exercicio")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Mídias", description = "Endpoint para gerenciar exercícios controlados pelos fisioterapeutas")
public class ExercicioController {

    private final ExercicioService exercicioService;
    private final FisioterapeutaRepository fisioterapeutaRepository;

    public ExercicioController(ExercicioService exercicioService, FisioterapeutaRepository fisioterapeutaRepository) {
        this.exercicioService = exercicioService;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
    }

    @GetMapping
    @Operation(summary = "Obter todas os exercícios", description = "Obter uma lista de todos os exercícios disponíveis.")
    public ResponseEntity<List<ExercicioResponse>> getAllExercicios() {
        List<ExercicioResponse> midias = ExercicioResponse.toExercicioResponse(exercicioService.getAllExercicios());
        return new ResponseEntity<>(midias, HttpStatus.OK);
    }

    @GetMapping("/owner/{id}")
    @Operation(summary = "Obter exercícios por ID do Fisioterapeuta", description = "Obter exercícios associados a um Fisioterapeuta específico pelo seu ID.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Fisioterapeuta não encontrado")
    public ResponseEntity<List<ExercicioResponse>> getExercicioByFisioterapeuta(@PathVariable Integer id) {
        Optional<Fisioterapeuta> optionalFisioterapeuta = fisioterapeutaRepository.findById(id);

        System.out.println("Found this fisioterapeuta: " + optionalFisioterapeuta);

        if (optionalFisioterapeuta.isPresent()) {
            Fisioterapeuta fisioterapeuta = optionalFisioterapeuta.get();
            List<ExercicioResponse> exercicioList = exercicioService.getExercicioByFisioterapeuta(fisioterapeuta);
            return new ResponseEntity<>(exercicioList, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obter exercício por ID", description = "Obter um item de exercício específico com base no seu ID.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    @ApiResponse(responseCode = "404", description = "Exercício não encontrado")
    public ResponseEntity<ExercicioResponse> getExercicioById(@PathVariable Integer id) {
        ExercicioResponse exercicio = exercicioService.getExercicioById(id);
        if (exercicio != null) {
            return new ResponseEntity<>(exercicio, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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

    @DeleteMapping("/{id}")
    @Operation(summary = "Excluir exercício", description = "Excluir um item de exercício específico com base no seu ID.")
    @ApiResponse(responseCode = "200", description = "Exercício excluído com sucesso")
    @ApiResponse(responseCode = "404", description = "Exercício não encontrado")
    public ResponseEntity<Void> deleteExercicio(@PathVariable Integer id,
            @RequestHeader("Authorization") String token) {
        exercicioService.deleteExercicio(id, token);
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
