// Processo1.js
import React, { useEffect, useState } from 'react';
import { Row, Col, DatePicker } from 'antd';
import MetricCard from 'pages/Indicadores/components/MetricCard';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';

const Processo1 = () => {
    const [metricsData, setMetricsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch or set your metrics data here
            const mockData = {
                confirmationRate: 75,
                cancellationRate: 10,
            };

            setMetricsData(mockData);
        };

        fetchData();
    }, []);

    const confirmationRateData = {
        labels: ['Confirmadas', 'Não Confirmadas'],
        datasets: [
            {
                label: "%",
                data: [metricsData?.confirmationRate || 0, 100 - (metricsData?.confirmationRate || 0)],
                backgroundColor: ['#00c3a5', '#0BBFD9'],
                hoverBackgroundColor: ['#37dec4', '#23d1eb'],
            },
        ],
    };

    const cancellationRateData = {
        labels: ['Canceladas', 'Não Canceladas'],
        datasets: [
            {
                data: [metricsData?.cancellationRate || 0, 100 - (metricsData?.cancellationRate || 0)],
                backgroundColor: ['#0BBFD9', '#00c3a5'],
                hoverBackgroundColor: ['#23d1eb', '#37dec4'],
            },
        ],
    };

    const MothSelector = () => {
        return (
            <DatePicker picker="month"
                onChange={(e) => console.log(e)}
                autoComplete='on'
                placeholder='Selecione o mês'
            />
        )
    }

    return (
        <>
            <ProcessContainer
                processName={"Solicitar Agendamento de Consulta"}
                processNumber={1}
                chartsContainer={<Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col span={12}>
                        <MetricCard
                            title="Taxa de confirmações de consultas mensais"
                            objectives="Mensura a eficácia na confirmação das consultas agendadas mensalmente."
                            description="Calcula a porcentagem de consultas confirmadas em relação ao total de consultas agendadas em escala mensal."
                            chartData={confirmationRateData}
                            cardHeaderInput={<MothSelector />}
                        />
                    </Col>
                    <Col span={12}>
                        <MetricCard
                            title="Taxa de agendamentos cancelados"
                            objectives="Minimizar cancelamentos."
                            description="Mede a porcentagem de agendamentos cancelados em relação ao total de agendamentos."
                            chartData={cancellationRateData}
                        />
                    </Col>
                </Row>}
            />
        </>
    );
};

export default Processo1;