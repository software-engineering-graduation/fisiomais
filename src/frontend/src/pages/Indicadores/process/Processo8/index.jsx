import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';

const Processo8 = () => {
    const [tratamentoData, setTratamentoData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchTratamentoData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/taxa-criacao-fisioterapeutas`);
            setTratamentoData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTratamentoData();
    }, [token]); 

    const chartData = {
        labels: tratamentoData.map(data => data.fisioterapeutaNome),
        datasets: [
            {
                label: 'Taxa de Criação de Tratamentos',
                data: tratamentoData.map(data => data.taxaCriacaoTratamentos),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true, 
        maintainAspectRatio: false, 
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    return (
        <ProcessContainer
            processName={"Criar Tratamento"}
            processNumber={8}
            chartsContainer={
                <Row gutter={16}>
                    <Col span={24}>
                        {loading && <div>Loading...</div>}
                        {error && <div style={{ color: 'red' }}>Error: {error}</div>} 
                        {!loading && !error && (
                            <div style={{ height: '400px' }}> 
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        )}
                    </Col>
                </Row>
            }
        />
    );
};

export default Processo8;
