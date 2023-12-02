package com.fisiomais.model.indicators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaxaTratamentoFisioterapeutaMetrics {
    private Integer fisioterapeutaId;
    private Long totalTratamentosCriados;
    private Double taxaCriacaoTratamentos;
}
