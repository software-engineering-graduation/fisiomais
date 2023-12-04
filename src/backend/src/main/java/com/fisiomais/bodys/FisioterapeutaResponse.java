package com.fisiomais.bodys;

import com.fisiomais.model.Fisioterapeuta;

public record FisioterapeutaResponse(
                Integer id,
                String nome,
                String email,
                String telefone,
                String endereco,
                Boolean automatic) {

        public static FisioterapeutaResponse toFisioterapeutaResponse(Fisioterapeuta fisioterapeuta) {
                return new FisioterapeutaResponse(
                                fisioterapeuta.getId(),
                                fisioterapeuta.getNome(),
                                fisioterapeuta.getEmail(),
                                fisioterapeuta.getTelefone(),
                                fisioterapeuta.getEndereco(),
                                fisioterapeuta.getAutomatic());
        }
}
