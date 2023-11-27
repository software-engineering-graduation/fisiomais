package com.fisiomais.model.indicators;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MidiaUtilizationMetrics {
    @Column(name = "total_midias")
    private Long totalMidias;
    @Column(name = "total_exercicios")
    private Long totalExercicios;
    @Column(name = "midias_com_exercicios")
    private Long midiasComExercicios;
    @Column(name = "taxa_utilizacao")
    private Float taxaUtilizacao;
}
