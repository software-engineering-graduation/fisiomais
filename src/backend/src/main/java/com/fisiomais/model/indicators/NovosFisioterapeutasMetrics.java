package com.fisiomais.model.indicators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NovosFisioterapeutasMetrics {
    private Integer mes;
    private Long numNovosCadastros;
}
