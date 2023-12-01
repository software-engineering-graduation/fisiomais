package com.fisiomais.bodys;

import java.util.List;

import com.fisiomais.model.Exercicio;

public record ExercicioTratamentoResponse(
        Integer id,
        String nome,
        String descricao,
        List<MidiaTratamentoResponse> midias) {

    public static List<ExercicioTratamentoResponse> toExercicioResponse(List<Exercicio> exercicios) {
        return exercicios.stream()
                .map(exercicio -> ExercicioTratamentoResponse.toExercicioResponse(exercicio))
                .toList();
    }

    public static ExercicioTratamentoResponse toExercicioResponse(Exercicio exercicio) {
        return new ExercicioTratamentoResponse(
                exercicio.getId(),
                exercicio.getNome(),
                exercicio.getDescricao(),
                MidiaTratamentoResponse.toResponse(exercicio.getMidias()));
    }

    public static List<ExercicioTratamentoResponse> toExercicioResponseTratamento(List<Exercicio> exercicios) {
        return exercicios.stream()
                .map(exercicio -> ExercicioTratamentoResponse.toExercicioResponseTratamento(exercicio))
                .toList();
    }

    public static ExercicioTratamentoResponse toExercicioResponseTratamento(Exercicio exercicio) {
        return new ExercicioTratamentoResponse(
                exercicio.getId(),
                exercicio.getNome(),
                exercicio.getDescricao(),
                MidiaTratamentoResponse.toResponse(exercicio.getMidias()));
    }
}
