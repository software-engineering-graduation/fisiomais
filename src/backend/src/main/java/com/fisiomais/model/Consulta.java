package com.fisiomais.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fisiomais.model.enums.StatusConsulta;

import jakarta.persistence.*;

@Data
@Entity
@Table(name = "consulta")
public class Consulta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer _id;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_time", updatable = false)
    @JsonFormat(pattern = "MM-dd-yyyy HH:mm:ss", timezone = "UTC")
    private Date create_time;

    @ManyToOne
    @JoinColumn(name = "paciente__id", referencedColumnName = "_id")
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "fisioterapeuta__id", referencedColumnName = "_id")
    private Fisioterapeuta fisioterapeuta;

    @Column(nullable = false, name = "data_e_hora")
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "MM-dd-yyyy HH:mm:ss", timezone = "UTC")
    private Date dataEHora;

    @Column(length = 500)
    private String observacoes;

    @Column(nullable = false, columnDefinition = "ENUM('confirmado', 'cancelado', 'realizado', 'pendente')")
    @Enumerated(EnumType.STRING)
    private StatusConsulta confirmacao;

    @Column(nullable = false)
    private Integer owner_id;

    @Lob
    private String link;
}
