import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import PieMetricCard from 'pages/Indicadores/components/PieMetricCard';
import BarMetricCard from 'pages/Indicadores/components/BarMetricCard';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Processo6 = () => {
    const [taxaSatisfacao, setTaxaSatisfacao] = useState(0);
    const [dadosSessoes, setDadosSessoes] = useState([]);

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const responseSatisfacao = await axios.get('http://localhost:8081/api/acompanhamento/taxaSatisfacao');
                setTaxaSatisfacao(responseSatisfacao.data);

                const responseSessoes = await axios.get('http://localhost:8081/api/acompanhamento/indiceAcompanhamento');
                setDadosSessoes(responseSessoes.data);
            } catch (error) {
                console.error('Erro ao buscar dados', error.response || error);
            }
        };
    
        fetchIndicators();
    }, []);

    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = new Array(12).fill(0);
    dadosSessoes.forEach(item => {
        data[item.mes - 1] = item.mediaSessoes;
    });

    const sessoesData = {
        labels,
        datasets: [
            {
                label: 'Média Mensal de Sessões',
                data,
                backgroundColor: 'rgba(0, 195, 165, 0.5)',
                borderColor: 'rgba(0, 195, 165, 1)',
                borderWidth: 1,
            },
        ],
    };

    const satisfacaoData = {
        labels: ['Satisfeitos', 'Insatisfeitos'],
        datasets: [
            {
                label: 'Taxa de Satisfação (%)',
                data: [taxaSatisfacao, 100 - taxaSatisfacao],
                backgroundColor: ['#00c3a5', '#0BBFD9'],
                hoverBackgroundColor: ['#37dec4', '#23d1eb'],
            },
        ],
    };

    return (
        <ProcessContainer
            processName={"Acompanhamento Virtual"}
            processNumber={6}
            chartsContainer={
                <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col span={12}>
                        <PieMetricCard
                            title="Taxa de Satisfação do Paciente"
                            objectives="Medir a satisfação do paciente com o acompanhamento virtual."
                            description="Porcentagem de pacientes satisfeitos."
                            chartData={satisfacaoData}
                        />
                    </Col>
                    <Col span={12}>
                        <BarMetricCard
                            title="Média de Sessões Mensais"
                            objectives="Avaliar a frequência das sessões de acompanhamento."
                            description="Média mensal de sessões realizadas."
                            chartData={sessoesData}
                        />
                    </Col>
                </Row>
            }
        />
    );
};

export default Processo6;
