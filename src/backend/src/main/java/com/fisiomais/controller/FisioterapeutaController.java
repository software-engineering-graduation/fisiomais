package com.fisiomais.controller;

import com.fisiomais.dto.FisioterapeutaDTO;
import com.fisiomais.service.FisioterapeutaService;
import com.fisiomais.model.Fisioterapeuta;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fisioterapeutas")
public class FisioterapeutaController {

    private final FisioterapeutaService fisioterapeutaService;

    @Autowired
    public FisioterapeutaController(FisioterapeutaService fisioterapeutaService) {
        this.fisioterapeutaService = fisioterapeutaService;
    }

    @GetMapping
    public ResponseEntity<List<Fisioterapeuta>> getAllFisioterapeutas() {
        List<Fisioterapeuta> fisioterapeutas = fisioterapeutaService.findAll();
        return ResponseEntity.ok(fisioterapeutas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Fisioterapeuta>> getFisioterapeutaById(@PathVariable Long id) {
        Optional<Fisioterapeuta> fisioterapeuta = fisioterapeutaService.findById(id);
        return ResponseEntity.ok(fisioterapeuta);
    }

    @PostMapping
    public ResponseEntity<Fisioterapeuta> createFisioterapeuta(@RequestBody FisioterapeutaDTO fisioterapeutaDTO) {
        Fisioterapeuta newFisioterapeuta = fisioterapeutaService.create(fisioterapeutaDTO);
        return ResponseEntity.ok(newFisioterapeuta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fisioterapeuta> updateFisioterapeuta(@PathVariable Long id, @RequestBody FisioterapeutaDTO fisioterapeutaDTO) {
        Fisioterapeuta updatedFisioterapeuta = fisioterapeutaService.update(id, fisioterapeutaDTO);
        return ResponseEntity.ok(updatedFisioterapeuta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFisioterapeuta(@PathVariable Long id) {
        fisioterapeutaService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
