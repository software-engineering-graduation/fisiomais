package com.fisiomais.controller;

import com.fisiomais.bodys.PacienteResponse;
import com.fisiomais.dto.PacienteDTO;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.indicators.NovosPacientesMetrics;
import com.fisiomais.service.PacienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/paciente")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Paciente", description = "Paciente API")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<PacienteDTO>> getAllPacientes() {
        List<PacienteDTO> pacientes = pacienteService.getAllPacientes();
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDTO> getPacienteById(@PathVariable Integer id) {
        PacienteDTO paciente = pacienteService.getPacienteById(id);
        if (paciente != null) {
            return new ResponseEntity<>(paciente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<PacienteResponse> createPaciente(@RequestBody PacienteDTO pacienteDTO) {
        PacienteResponse createdPaciente = pacienteService.createPaciente(pacienteDTO);
        return new ResponseEntity<>(createdPaciente, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteDTO> updatePaciente(@PathVariable Integer id, @RequestBody PacienteDTO pacienteDTO) {
        PacienteDTO updatedPaciente = pacienteService.updatePaciente(id, pacienteDTO);
        if (updatedPaciente != null) {
            return new ResponseEntity<>(updatedPaciente, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Integer id) {
        boolean deleted = pacienteService.deletePaciente(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/novos-pacientes-mes")
    @Operation(summary = "Obter quantidade de criação de novos pacientes por mês", description = "Obter quantidade de criação de novos pacientes por mês")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NovosPacientesMetrics.class)))
    public ResponseEntity<List<NovosPacientesMetrics>> getQtdPacientesMes() {
        try {
            List<NovosPacientesMetrics> qtdPacientesMes = pacienteService.getQtdNovosPacientesMes();
            return new ResponseEntity<>(qtdPacientesMes, HttpStatus.OK);
        } catch (Exception e) {
            throw new BusinessException("Erro ao obter a quantidade de pacientes por mês.");
        }
    }
}
