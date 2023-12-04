package com.fisiomais.bodys;

import java.util.Date;

public record NovaConsultaRequest(Integer id, Integer pacienteId, Integer fisioterapeutaId, Date dataHora) {
}
