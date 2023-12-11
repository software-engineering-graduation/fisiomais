package com.fisiomais.controller;

import java.util.List;

import javax.naming.NoPermissionException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.fisiomais.bodys.NovoTratamentoRequest;
import com.fisiomais.bodys.TratamentoResponse;
import com.fisiomais.exception.BusinessException;
import com.fisiomais.model.Tratamento;
import com.fisiomais.model.indicators.MidiaUtilizationMetrics;
import com.fisiomais.model.indicators.TaxaTratamentoFisioterapeutaMetrics;
import com.fisiomais.service.TokenService;
import com.fisiomais.service.TratamentoService;
import com.fisiomais.util.TratamentoUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/tratamento")
@SecurityRequirement(name = "Bearer Authentication")
@Tag(name = "Tratamento", description = "Tratamento API")
public class TratamentoController {

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(TratamentoController.class);
    private final TratamentoService tratamentoService;
    private final TratamentoUtil tratamentoUtil;
    private final TokenService tokenService;

    @DeleteMapping("{ids}")
    @Operation(summary = "Excluir tratamento(os)", description = "Excluir um ou mais tratamentos com base nos seus IDs.")
    @ApiResponse(responseCode = "200", description = "Tratamento excluído com sucesso")
    @ApiResponse(responseCode = "404", description = "Tratamento não encontrado")
    public ResponseEntity<Void> deleteTratamento(@PathVariable List<Integer> ids,
            @RequestHeader("Authorization") String token) {
        System.out.println("Deleting tratamento with IDs: " + ids);
        if (ids == null || ids.isEmpty()) {
            throw new BusinessException("No tratamento IDs provided. Accepted format: /tratamento/12,78,5,4,1,2");
        }
        tratamentoService.deleteTratamento(ids, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public TratamentoController(TratamentoService tratamentoService,
            TratamentoUtil tratamentoUtil,
            TokenService tokenService) {
        this.tratamentoService = tratamentoService;
        this.tratamentoUtil = tratamentoUtil;
        this.tokenService = tokenService;
    }

    @PostMapping("/novo")
    @Operation(summary = "Criar novo tratamento para paciente", description = "Criar um novo tratamento.")
    @ApiResponse(responseCode = "201", description = "Tratamento criado com sucesso", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Tratamento.class)))
    public ResponseEntity<TratamentoResponse> createTratamento(@RequestBody NovoTratamentoRequest tratamento) {
        Tratamento novoTratamentoMapped = tratamentoUtil.convertToTratamento(tratamento);
        TratamentoResponse newTratamento = tratamentoService.createTratamento(novoTratamentoMapped);
        return new ResponseEntity<>(newTratamento, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TratamentoResponse>> findAll() {
        List<Tratamento> obj = this.tratamentoService.findAll();
        logger.info("Tratamentos: {}", obj);
        return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
    }

    @GetMapping("/paciente/{id}")
    public ResponseEntity<List<TratamentoResponse>> findByPacienteId(@PathVariable Integer id) {
        List<Tratamento> obj = this.tratamentoService.findByPacienteId(id);
        return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
    }

    @GetMapping("/fisioterapeuta/{id}")
    public ResponseEntity<List<TratamentoResponse>> findByFisioterapeutaId(@PathVariable Integer id) {
        List<Tratamento> obj = this.tratamentoService.findByFisioterapeutaId(id);
        return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
    }

    @GetMapping("/fisioterapeuta/{id}/paciente/{idPaciente}")
    public ResponseEntity<List<TratamentoResponse>> findByFisioterapeutaIdAndPacienteId(@PathVariable Integer id,
            @PathVariable Integer idPaciente) {
        List<Tratamento> obj = this.tratamentoService.findByFisioterapeutaIdAndPacienteId(id, idPaciente);
        return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Tratamento> findTratamentoByTitulo(@PathVariable String titulo) {
        Tratamento obj = this.tratamentoService.findTratamentoByTitulo(titulo);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TratamentoResponse> findById(@PathVariable Integer id,
            @RequestHeader(name = "Authorization") String token) throws NoPermissionException {
        Tratamento obj = this.tratamentoService.findById(id);
        if (this.tokenService.sameUserEmail(obj.getFisioterapeuta().getEmail(), token).booleanValue()) {
            logger.info("Getting tratamento to fisioterapeuta: {}", obj.getFisioterapeuta().getEmail());
            return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
        }
        if (this.tokenService.sameUserEmail(obj.getPaciente().getEmail(), token).booleanValue()) {
            logger.info("Getting tratamento to paciente: {}", obj.getPaciente().getEmail());
            return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
        }
        if (this.tokenService.isAdmin(token).booleanValue()) {
            logger.info("Getting tratamento to admin: {}", obj.getFisioterapeuta().getEmail());
            return ResponseEntity.ok().body(TratamentoResponse.toTratamentoResponse(obj));
        }

        throw new NoPermissionException("Usuário não tem permissão para acessar este tratamento.");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tratamento> putTratamento(@PathVariable Integer id,
            @RequestBody NovoTratamentoRequest tratamento) {
        Tratamento novoTratamentoMapped = tratamentoUtil.convertToTratamento(tratamento);
        Tratamento newTratamento = tratamentoService.updateTratamento(id, novoTratamentoMapped);
        return new ResponseEntity<>(newTratamento, HttpStatus.OK);
    }

    @GetMapping("/taxa-utilizacao")
    @Operation(summary = "Obter taxa de utilização de mídias nos exercícios", description = "Obter a taxa de utilização de mídias nos exercícios.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida")
    public ResponseEntity<MidiaUtilizationMetrics> getTaxaUtilizacao() {
        try {
            List<MidiaUtilizationMetrics> taxaUtilizacao = tratamentoService.getTaxaUtilizacao();
            logger.info("Taxa de utilização:");
            logger.info("Total de exercicios: {}", taxaUtilizacao.get(0).getTotalExercicios());
            logger.info("Total de midias com exercicios: {}", taxaUtilizacao.get(0).getMidiasComExercicios());
            logger.info("Taxa de utilização: {}%", taxaUtilizacao.get(0).getTaxaUtilizacao());
            return new ResponseEntity<>(taxaUtilizacao.get(0), HttpStatus.OK);
        } catch (Exception e) {
            throw new BusinessException(e.getMessage());
        }
    }

    @GetMapping("/taxa-criacao-fisioterapeutas")
    @Operation(summary = "Obter taxa de criação de tratamentos por fisioterapeuta", description = "Obter a taxa de criação de tratamentos realizados por cada fisioterapeuta.")
    @ApiResponse(responseCode = "200", description = "Operação bem-sucedida", content = @Content(mediaType = "application/json", schema = @Schema(implementation = TaxaTratamentoFisioterapeutaMetrics.class)))
    public ResponseEntity<List<TaxaTratamentoFisioterapeutaMetrics>> getTaxaCriacaoTratamentosPorFisioterapeuta() {
        try {
            List<TaxaTratamentoFisioterapeutaMetrics> taxaCriacao = tratamentoService
                    .getTaxaCriacaoTratamentosPorFisioterapeuta();
            return new ResponseEntity<>(taxaCriacao, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Erro ao obter taxa de criação de tratamentos por fisioterapeuta: {}", e.getMessage());
            throw new BusinessException("Erro ao obter taxa de criação de tratamentos por fisioterapeuta");
        }
    }
}
