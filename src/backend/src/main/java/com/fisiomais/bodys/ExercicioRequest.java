package com.fisiomais.bodys;

import java.util.List;

import com.fisiomais.model.Exercicio;
import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.Midia;

public record ExercicioRequest(
                String nome,
                String descricao,
                List<Integer> midias,
                Integer owner,
                Boolean isPublico) {

        public static Exercicio toEntity(ExercicioRequest exercicioDTO, Fisioterapeuta fisioterapeuta,
                        List<Midia> midias2) {
                Exercicio exercicio = new Exercicio();
                exercicio.setNome(exercicioDTO.nome());
                exercicio.setDescricao(exercicioDTO.descricao());
                exercicio.setFisioterapeuta(fisioterapeuta);
                exercicio.setMidias(midias2);
                exercicio.setIsPublic(exercicioDTO.isPublico());
                return exercicio;
        }
}
