package com.fisiomais.repository;

import com.fisiomais.model.Consulta;
import com.fisiomais.model.enums.StatusConsulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Integer> {

    List<Consulta> findByDataEHoraBetween(Date startOfDay, Date endOfDay);

    List<Consulta> findByConfirmacao(StatusConsulta status);

    List<Consulta> findByPaciente_Id(Integer pacienteId);

    List<Consulta> findByDataEHoraBetweenAndConfirmacao(LocalDateTime startOfDay, LocalDateTime endOfDay, StatusConsulta status);

	List<Consulta> findByFisioterapeutaId(Integer fisioterapeutaId);

    @Query("SELECT ROUND((SUM(CASE WHEN c.confirmacao = 'Realizado' THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 2) FROM Consulta c")
    Double calculateTaxaConclusao();

    @Query("SELECT ROUND((SUM(CASE WHEN c.confirmacao = 'Reagendado' THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 2) FROM Consulta c")
    Double calculateTaxaReagendamento();
}
