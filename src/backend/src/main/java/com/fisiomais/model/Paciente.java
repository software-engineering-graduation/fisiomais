package com.fisiomais.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fisiomais.model.enums.Genero;

@Data
@Entity
@Table(name = "paciente")
public class Paciente extends User{
    @Column(nullable = false, name = "data_nascimento")
    @Temporal(TemporalType.DATE)
    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date dataNascimento;

    @Column(nullable = false, length = 11)
    private String cpf;

    @Column(nullable = false, length = 11)
    private String telefone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('Homem', 'Mulher', 'Outro')")
    private Genero genero;

    @OneToMany(mappedBy = "paciente")
    private List<Tratamento> tratamentos = new ArrayList<Tratamento>();
}
