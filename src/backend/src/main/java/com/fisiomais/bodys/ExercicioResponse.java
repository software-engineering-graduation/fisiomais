package com.fisiomais.bodys;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fisiomais.model.Exercicio;

public record ExercicioResponse(
        Integer id,
        String nome,
        String descricao,
        @JsonFormat(pattern = "dd/MM/yyy", timezone = "UTC") Date createTime,
        List<MidiaTratamentoResponse> midias,
        Boolean isPublic) {

    public static List<ExercicioResponse> toExercicioResponse(List<Exercicio> exercicios) {
        return exercicios.stream()
                .map(exercicio -> ExercicioResponse.toExercicioResponse(exercicio))
                .toList();
    }

    public static ExercicioResponse toExercicioResponse(Exercicio exercicio) {
        return new ExercicioResponse(
                exercicio.getId(),
                exercicio.getNome(),
                exercicio.getDescricao(),
                exercicio.getCreateTime(),
                MidiaTratamentoResponse.toResponse(exercicio.getMidias()),
                exercicio.getIsPublic());
    }
}
