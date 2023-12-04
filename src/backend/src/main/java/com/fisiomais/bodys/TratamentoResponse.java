package com.fisiomais.bodys;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fisiomais.model.Tratamento;

public record TratamentoResponse(
        Integer id,
        PacienteResponse paciente,
        FisioterapeutaResponse fisioterapeuta,
        String titulo,
        String observacoes,
        String feedback,
        List<ExercicioResponse> exercicios,
        @JsonFormat(pattern = "dd/MM/yyyy", timezone = "UTC") Date startDate,
        @JsonFormat(pattern = "dd/MM/yyyy", timezone = "UTC") Date endDate) {

    static public List<TratamentoResponse> toTratamentoResponse(List<Tratamento> tratamentos) {
        return tratamentos.stream()
                .map(tratamento -> TratamentoResponse.toTratamentoResponse(tratamento))
                .toList();
    }

    static public TratamentoResponse toTratamentoResponse(Tratamento tratamento) {
        return new TratamentoResponse(
                tratamento.getId(),
                PacienteResponse.toPacienteResponse(tratamento.getPaciente()),
                FisioterapeutaResponse.toFisioterapeutaResponse(tratamento.getFisioterapeuta()),
                tratamento.getTitulo(),
                tratamento.getObservacoes(),
                tratamento.getFeedback(),
                ExercicioResponse.toExercicioResponse(tratamento.getExercicios()),
                tratamento.getCreateTime(),
                tratamento.getEndDate());
    }
}
