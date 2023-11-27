package com.fisiomais.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fisiomais.bodys.TratamentoResponse;
import com.fisiomais.model.Tratamento;
import com.fisiomais.model.indicators.MidiaUtilizationMetrics;

@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Integer> {

    @Query("SELECT t FROM Tratamento t WHERE t.paciente.id = :id")
    List<Tratamento> findByPacienteId(@Param("id") Integer id);

    @Query("SELECT t FROM Tratamento t WHERE t.fisioterapeuta.id = :id")
    List<Tratamento> findByFisioterapeutaId(@Param("id") Integer id);

    @Query("SELECT t FROM Tratamento t WHERE t.titulo = :titulo")
    Tratamento findTratamentoByTitulo(@Param("titulo") String titulo);

    Optional<Tratamento> findById(Integer id);

    @Query("SELECT new com.fisiomais.model.indicators.MidiaUtilizationMetrics("
            + "COUNT(DISTINCT m.id) AS totalMidias, "
            + "COUNT(m.id) AS totalExercicios, "
            + "COUNT(DISTINCT em.midia.id) AS midiasComExercicios, "
            + "(COUNT(DISTINCT em.midia.id) / COUNT(DISTINCT m.id)) * 100 AS taxaUtilizacao) "
            + "FROM Midia m "
            + "LEFT JOIN ExercicioHasMidias em ON m.id = em.midia.id")
    MidiaUtilizationMetrics getTaxaUtilizacao();
}
