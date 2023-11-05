package com.fisiomais.controller;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fisiomais.dto.MidiaDTO;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Midia;
import com.fisiomais.repository.FisioterapeutaRepository;
import com.fisiomais.service.MidiaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/midia")
@Tag(name = "Mídias", description = "Endpoint para gerenciamento das mídias a serem controladas pelos fisioterapeutas")
public class MidiaController {

    private final MidiaService midiaService;
    private final FisioterapeutaRepository fisioterapeutaRepository;

    public MidiaController(MidiaService midiaService, FisioterapeutaRepository fisioterapeutaRepository) {
        this.midiaService = midiaService;
        this.fisioterapeutaRepository = fisioterapeutaRepository;
    }

    @GetMapping
    public ResponseEntity<List<MidiaDTO>> getAllMidias() {
        List<MidiaDTO> midias = midiaService.getAllMidias();
        return new ResponseEntity<>(midias, HttpStatus.OK);
    }

    @GetMapping("/owner/{id}")
    public ResponseEntity<List<Midia>> getMidiaByFisioterapeuta(@PathVariable Integer fisioterapeutaId) {
        Optional<Fisioterapeuta> optionalFisioterapeuta = fisioterapeutaRepository.findById(fisioterapeutaId);

        if (optionalFisioterapeuta.isPresent()) {
            Fisioterapeuta fisioterapeuta = optionalFisioterapeuta.get();
            List<Midia> midiaList = midiaService.getMidiaByFisioterapeuta(fisioterapeuta);
            return new ResponseEntity<>(midiaList, HttpStatus.OK);
        } else {
            // Handle the case where the Fisioterapeuta with the provided ID is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MidiaDTO> getMidiaById(@PathVariable Integer id) {
        MidiaDTO midia = midiaService.getMidiaById(id);
        if (midia != null) {
            return new ResponseEntity<>(midia, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<MidiaDTO> createMidia(@RequestBody MidiaDTO midiaDTO) {
        MidiaDTO createdMidia = midiaService.createMidia(midiaDTO);
        return new ResponseEntity<>(createdMidia, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMidia(@RequestBody List<Integer> ids) {
        boolean deleted = midiaService.deleteMidia(ids);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
