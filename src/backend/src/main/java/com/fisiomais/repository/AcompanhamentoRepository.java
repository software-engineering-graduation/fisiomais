package com.fisiomais.repository;

import com.fisiomais.model.AcompanhamentoVirtual;
import com.fisiomais.service.interfaces.AcompanhamentoInterface;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AcompanhamentoRepository extends JpaRepository<AcompanhamentoVirtual, Long> {
    @Query(value = "SELECT " +
            "    YEAR(data_sessao) as ano, " +
            "    MONTH(data_sessao) as mes, " +
            "    AVG(sessoes) as mediaSessoes " +
            "FROM ( " +
            "    SELECT data_sessao, " +
            "    COUNT(*) as sessoes " +
            "    FROM acompanhamento_virtual " +
            "    WHERE data_sessao >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR) " +
            "    GROUP BY data_sessao " +
            ") as sessoesPorData " +
            "GROUP BY YEAR(data_sessao), MONTH(data_sessao) " +
            "ORDER BY ano, mes", nativeQuery = true)
    List<AcompanhamentoInterface> indiceAcompanhamento();

    @Query(value = "SELECT CONCAT(ROUND((SUM(CASE WHEN avaliacao IN ('Excelente', 'Bom') THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2)) AS taxa_satisfacao FROM acompanhamento_virtual", nativeQuery = true)
    Double calculateTaxaSatisfacao();
}
