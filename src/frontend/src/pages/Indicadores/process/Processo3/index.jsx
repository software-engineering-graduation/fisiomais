import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';

const Processo3 = () => {
    const [novosPacientesData, setNovosPacientesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchNovosPacientesData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8081/api/paciente/novos-pacientes-mes');
            const sortedData = response.data.sort((a, b) => a.mes - b.mes);
            setNovosPacientesData(sortedData);
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchNovosPacientesData();
    }, [token]);

    const chartData = {
        labels: novosPacientesData.map(data => `Mês ${data.mes}`),
        datasets: [
            {
                label: 'Número de Novos Pacientes',
                data: novosPacientesData.map(data => data.numNovosPacientes),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
            processName={"Cadastro de Pacientes"}
            processNumber={3}
            chartsContainer={
                <Row gutter={16}>
                    <Col span={24}>
                        {loading && <div>Loading...</div>}
                        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
                        {!loading && !error && (
                            <div style={{ height: '400px', width: '100%' }}> 
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        )}
                    </Col>
                </Row>
            }
        />
    );
};

export default Processo3;
