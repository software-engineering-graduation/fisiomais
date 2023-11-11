package com.fisiomais.bodys;

public record FisioterapeutaResponse(
        Integer id,
        String nome,
        String email,
        String telefone,
        String endereco,
        Boolean automatic) {
}
