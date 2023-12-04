package com.fisiomais.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode
@Embeddable
class TratamentoHasExerciciosKey implements Serializable {
    @Column(name = "tratamento__id")
    private Integer tratamentoId;

    @Column(name = "exercicio__id")
    private Integer exercicioId;
}

@Data
@Entity
@Table(name = "tratamento_has_exercicios")
public class TratamentoHasExercicios {
    @EmbeddedId
    private TratamentoHasExerciciosKey id;

    @ManyToOne
    @MapsId("tratamendoId")
    @JoinColumn(name = "tratamento__id")
    private Tratamento tratamento;

    @ManyToOne
    @MapsId("exercicioId")
    @JoinColumn(name = "exercicio__id")
    private Exercicio exercicio;
}