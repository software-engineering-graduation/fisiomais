package com.fisiomais.bodys;

import java.util.List;

import com.fisiomais.model.Exercicio;

public record ExercicioResponse(
        Integer id,
        String nome,
        String descricao,
        List<MidiaTratamentoResponse> midias) {

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
                MidiaTratamentoResponse.toResponse(exercicio.getMidias()));
    }
}
