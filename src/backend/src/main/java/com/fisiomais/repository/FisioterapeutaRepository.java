package com.fisiomais.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fisiomais.model.Fisioterapeuta;
import com.fisiomais.model.indicators.NovosFisioterapeutasMetrics;

@Repository
public interface FisioterapeutaRepository extends JpaRepository<Fisioterapeuta, Integer> {
    List<Fisioterapeuta> findAll();

    Page<Fisioterapeuta> findAll(Pageable pageable);

    List<Fisioterapeuta> findByNomeContainingIgnoreCase(String nome);

    boolean existsByEmail(String email);

    boolean existsByEmailAndIdNot(String email, Integer id);

    Fisioterapeuta findByEmail(String email);

    @Query("SELECT new com.fisiomais.model.indicators.NovosFisioterapeutasMetrics(" +
            "m.mes, " +
            "SUM(COALESCE(n.numNovosCadastros, 0)) OVER (ORDER BY m.mes) AS numNovosCadastros) " +
            "FROM (" +
            "SELECT 1 AS mes " +
            "UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 " +
            "UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 " +
            "UNION SELECT 12) AS m " +
            "LEFT JOIN (" +
            "   SELECT " +
            "      MONTH(f.create_time) AS mes, " +
            "      COUNT(f) AS numNovosCadastros " +
            "   FROM Fisioterapeuta f " +
            "   WHERE YEAR(f.create_time) = :anoDesejado " +
            "   GROUP BY MONTH(f.create_time)" +
            ") n ON m.mes = n.mes")
    List<NovosFisioterapeutasMetrics> findNovosCadastrosMensais(@Param("anoDesejado") Integer anoDesejado);

}
