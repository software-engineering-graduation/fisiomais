package com.fisiomais.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "fisioterapeuta")
public class Fisioterapeuta extends User{
    @Column(name = "controle_automatico", nullable = false)
    private Boolean automatic;
}