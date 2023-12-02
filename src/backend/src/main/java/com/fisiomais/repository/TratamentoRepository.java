package com.fisiomais.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fisiomais.model.Exercicio;
import com.fisiomais.model.Tratamento;
import com.fisiomais.model.indicators.TaxaTratamentoFisioterapeutaMetrics;

@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Integer> {

    @Query("SELECT t FROM Tratamento t WHERE t.paciente.id = :id")
    List<Tratamento> findByPacienteId(@Param("id") Integer id);

    @Query("SELECT t FROM Tratamento t WHERE t.fisioterapeuta.id = :id")
    List<Tratamento> findByFisioterapeutaId(@Param("id") Integer id);

    @Query("SELECT t FROM Tratamento t WHERE t.titulo = :titulo")
    Tratamento findTratamentoByTitulo(@Param("titulo") String titulo);

    Optional<Tratamento> findById(Integer id);

    Optional<List<Tratamento>> findByFisioterapeutaIdAndPacienteId(Integer id, Integer idPaciente);

<<<<<<< HEAD
    @Query("SELECT new com.fisiomais.model.indicators.TaxaTratamentoFisioterapeutaMetrics(t.fisioterapeuta.id, COUNT(t), (COUNT(t) * 1.0) / (SELECT COUNT(t2) FROM Tratamento t2 WHERE t2.fisioterapeuta.id = t.fisioterapeuta.id)) FROM Tratamento t GROUP BY t.fisioterapeuta.id")
    List<TaxaTratamentoFisioterapeutaMetrics> findTaxaCriacaoTratamentosPorFisioterapeuta();
=======
    void deleteTratamentoHasExerciciosByExercicios(Exercicio exercicio);
>>>>>>> ba17d64494dca4e0818c52dfed89a8cd88e40c33
}
