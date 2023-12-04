package com.fisiomais.bodys;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fisiomais.model.Paciente;
import com.fisiomais.model.enums.Genero;

public record PacienteResponse(
        Integer id,
        String nome,
        String email,
        String telefone,
        String endereco,
        @JsonFormat(pattern = "dd/MM/yyyy") Date dataNascimento,
        Genero genero) {

    public static PacienteResponse toPacienteResponse(Paciente paciente) {
        return new PacienteResponse(paciente.getId(),
                paciente.getNome(),
                paciente.getEmail(),
                paciente.getTelefone(),
                paciente.getEndereco(),
                paciente.getDataNascimento(),
                paciente.getGenero());
    }
}
