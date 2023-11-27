// Processo1.js
import React, { useEffect, useState, createContext } from 'react';
import { Button, Modal, Space, Row, Col, DatePicker } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import MetricCard from 'pages/Indicadores/components/MetricCard';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const Processo1 = () => {
    const [modal, contextHolder] = Modal.useModal();

    const [metricsData, setMetricsData] = useState(null);
    const [statusConfirmation, setStatusConfirmation] = useState('idle'); // ['loading', 'error', 'success', 'idle]
    const [statusCancellation, setStatusCancellation] = useState('idle'); // ['loading', 'error', 'success', 'idle]
    const [modalData, setModalData] = useState(undefined);

    const isLoadingConfirmation = statusConfirmation === 'loading';
    const isErrorConfirmation = statusConfirmation === 'error';
    const isSuccessConfirmation = statusConfirmation === 'success';
    const isLoadingCancellation = statusCancellation === 'loading';
    const isErrorCancellation = statusCancellation === 'error';
    const isSuccessCancellation = statusCancellation === 'success';

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const fetchDataConfirmation = async (month, year) => {
        setStatusConfirmation('loading');
        // console.info('Fetching data for month', month, 'and year', year)

        let response
        let error = false

        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/consulta/taxa-confirmacao/${month}/${year}`)
            .then((res) => {
                response = res.data;
                const percentageTwoDecimals = parseFloat(response.taxaConfirmacao).toFixed(2);
                const config = {
                    title: `Taxa de confirmações de consultas mensais - ${month}/${year}`,
                    centered: true,
                    content: (
                        <Space direction="vertical">
                            <span><strong>Consultas confirmadas:</strong> {res.data.consultasConfirmadas}</span>
                            <span><strong>Total de consultas:</strong> {res.data.totalConsultas}</span>
                            <span><strong>Taxa de confirmação:</strong> {percentageTwoDecimals}%</span>
                        </Space>
                    ),
                };
                setModalData(config);
            }
            ).catch((err) => {
                setModalData(undefined);
                if (err.response.status === 400) {
                    // console.info('No data found for month', month, 'and year', year)
                    error = true
                    setMetricsData(undefined)
                    return
                }
                else
                    setStatusConfirmation('error');
            })

        if (!error)
            setMetricsData({
                confirmationRate: parseFloat(response.taxaConfirmacao).toFixed(2),
                cancellationRate: metricsData?.cancellationRate || 0,
            });
        setStatusConfirmation('success');
    };

    const fetchDataCancellation = async () => {
        setStatusCancellation('loading');

        setMetricsData({
            confirmationRate: metricsData?.confirmationRate || 0,
            cancellationRate: 10,
        });

        setStatusCancellation('success');
    }

    useEffect(() => {
        const today = new Date();
        fetchDataConfirmation(today.getMonth() + 1, today.getFullYear());
        fetchDataCancellation();
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

    const debounce = (func, delay) => {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }

    const debouncedMakeRequest = debounce(fetchDataConfirmation, 1200); // 1.2 seconds delay

    const treatMothUpdate = (month, year) => {
        debouncedMakeRequest(month, year);
    }

    const MothSelector = () => {
        return (
            <DatePicker picker="month"
                onChange={(e) => treatMothUpdate(e.month() + 1, e.year())}
                autoComplete='on'
                placeholder='Selecione o mês'
            />
        )
    }

    const mesNome = (mes) => {
        switch (mes) {
            case 1:
                return 'Janeiro';
            case 2:
                return 'Fevereiro';
            case 3:
                return 'Março';
            case 4:
                return 'Abril';
            case 5:
                return 'Maio';
            case 6:
                return 'Junho';
            case 7:
                return 'Julho';
            case 8:
                return 'Agosto';
            case 9:
                return 'Setembro';
            case 10:
                return 'Outubro';
            case 11:
                return 'Novembro';
            case 12:
                return 'Dezembro';
            default:
                return 'Mês inválido';
        }
    }

    return (
        <ReachableContext.Provider value="Light">
            <ProcessContainer
                processName={"Solicitar Agendamento de Consulta"}
                processNumber={1}
                chartsContainer={<Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col span={12}>
                        <MetricCard
                            title={`Taxa de confirmações de consultas mensais - ${mesNome(new Date().getMonth() + 1)}/${new Date().getFullYear()}`}
                            objectives="Mensura a eficácia na confirmação das consultas agendadas mensalmente."
                            description="Calcula a porcentagem de consultas confirmadas em relação ao total de consultas agendadas em escala mensal."
                            chartData={confirmationRateData}
                            cardHeaderInput={<MothSelector />}
                            loading={isLoadingConfirmation}
                            error={isErrorConfirmation || !metricsData}
                            moreDataOpener={<CenteredButton
                                onClick={async () => {
                                    modal.info(modalData);
                                }}
                            >
                                Exibir mais detalhes
                            </CenteredButton>}
                        />
                    </Col>
                    <Col span={12}>
                        <MetricCard
                            title="Taxa de agendamentos cancelados"
                            objectives="Minimizar cancelamentos."
                            description="Mede a porcentagem de agendamentos cancelados em relação ao total de agendamentos."
                            chartData={cancellationRateData}
                            loading={isLoadingCancellation}
                            error={isErrorCancellation || !metricsData}
                        />
                    </Col>
                </Row>}
            />

            {/* `contextHolder` should always be placed under the context you want to access */}
            {contextHolder}

            {/* Can not access this context since `contextHolder` is not in it */}
            <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>
    );
};

const NoDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CenteredButton = styled(Button)`
    font-size: 1.0rem;
    border-radius: 5px;
    background-color: #0BD980 !important;
    border-color: #fff !important;
    color: #fff !important;
    &:hover{
        background-color: #5ee0a8 !important;
        border-color: #fff !important;
        color: #fff !important;
    }
`

export default Processo1;