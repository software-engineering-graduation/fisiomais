package com.fisiomais.controller;

import com.fisiomais.model.Consulta;
import com.fisiomais.model.enums.StatusConsulta;
import com.fisiomais.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/consultas")
public class ConsultaController {

    private final ConsultaService consultaService;

    @Autowired
    public ConsultaController(ConsultaService consultaService) {
        this.consultaService = consultaService;
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Consulta>> getConsultasForDate(@PathVariable LocalDate date) {
        List<Consulta> consultas = consultaService.getConsultasForDate(date);
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/{consultaId}")
    public ResponseEntity<Consulta> getConsultaById(@PathVariable Long consultaId) {
        Consulta consulta = consultaService.getConsultaById(consultaId);
        return ResponseEntity.ok(consulta);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Consulta>> getConsultasByStatus(@PathVariable StatusConsulta status) {
        List<Consulta> consultas = consultaService.getConsultasByStatus(status);
        return ResponseEntity.ok(consultas);
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<Consulta>> getConsultasByPacienteId(@PathVariable Long pacienteId) {
        List<Consulta> consultas = consultaService.getConsultasByPacienteId(pacienteId);
        return ResponseEntity.ok(consultas);
    }

    @PostMapping
    public ResponseEntity<Consulta> addConsulta(@RequestBody Consulta consulta) {
        Consulta newConsulta = consultaService.addConsulta(consulta);
        return new ResponseEntity<>(newConsulta, HttpStatus.CREATED);
    }

    @PatchMapping("/{consultaId}/status")
    public ResponseEntity<Consulta> updateConsultaStatus(@PathVariable Long consultaId, @RequestBody StatusConsulta status) {
        Consulta consulta = consultaService.updateConsultaStatus(consultaId, status);
        return ResponseEntity.ok(consulta);
    }

    @PatchMapping("/{consultaId}/concluir")
    public ResponseEntity<Consulta> marcarConsultaComoConcluida(@PathVariable Long consultaId) {
        Consulta consulta = consultaService.marcarConsultaComoConcluida(consultaId);
        return ResponseEntity.ok(consulta);
    }

    @PatchMapping("/{consultaId}/cancelar")
    public ResponseEntity<Consulta> cancelarConsulta(@PathVariable Long consultaId) {
        Consulta consulta = consultaService.cancelarConsulta(consultaId);
        return ResponseEntity.ok(consulta);
    }

    @PatchMapping("/{consultaId}/reagendar")
    public ResponseEntity<Consulta> reagendarConsulta(@PathVariable Long consultaId, @RequestBody Date novaDataHora) {
        Consulta consulta = consultaService.reagendarConsulta(consultaId, novaDataHora);
        return ResponseEntity.ok(consulta);
    }

    @PatchMapping("/{consultaId}/confirmar-presenca")
    public ResponseEntity<Consulta> confirmarPresenca(@PathVariable Long consultaId) {
        Consulta consulta = consultaService.confirmarPresenca(consultaId);
        return ResponseEntity.ok(consulta);
    }

    @PatchMapping("/{consultaId}/feedback")
    public ResponseEntity<Consulta> registrarFeedback(@PathVariable Long consultaId, @RequestBody String feedback) {
        Consulta consulta = consultaService.registrarFeedback(consultaId, feedback);
        return ResponseEntity.ok(consulta);
    }

    @PostMapping("/{consultaId}/notificar")
    public ResponseEntity<?> notificarPaciente(@PathVariable Long consultaId, @RequestBody String mensagem) {
        consultaService.notificarPaciente(consultaId, mensagem);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{consultaId}")
    public ResponseEntity<?> deleteConsulta(@PathVariable Long consultaId) {
        consultaService.deleteConsulta(consultaId);
        return ResponseEntity.ok().build();
    }
}
