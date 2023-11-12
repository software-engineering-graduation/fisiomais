package com.fisiomais.repository;

import com.fisiomais.model.Consulta;
import com.fisiomais.model.enums.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Integer> {

    List<Consulta> findByDataEHoraBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    List<Consulta> findByConfirmacao(StatusConsulta status);

    List<Consulta> findByPaciente_Id(Integer paciente_id);

}
