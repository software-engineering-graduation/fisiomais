package com.fisiomais.model.indicators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NovosPacientesMetrics {

    private Integer mes;
    private Long numNovosPacientes;

}
