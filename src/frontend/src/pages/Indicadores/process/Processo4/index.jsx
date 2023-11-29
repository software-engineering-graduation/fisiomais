// Processo4.js
import React, { useEffect, useState, createContext } from 'react';
import { Button, Modal, Space, Row, Col, DatePicker, Divider } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PieMetricCard from 'pages/Indicadores/components/PieMetricCard';
import LineMetricCard from 'pages/Indicadores/components/LineMetricCard';
import ProcessContainer from 'pages/Indicadores/components/ProcessContainer';
import { set } from 'date-fns';

const ReachableContext = createContext(null);
const UnreachableContext = createContext(null);

const Processo4 = () => {
    const [modal, contextHolder] = Modal.useModal();

    const [metricsDataMidiasUsage, setMetricsDataMidiasUsage] = useState(null);
    const [metricsDataTypeMidiaUsage, setMetricsDataTypeMidiaUsage] = useState(null);
    const [statusMidiasUsage, setStatusMidiasUsage] = useState('idle'); // ['loading', 'error', 'success', 'idle]
    const [statusTypeMidiaUsage, setStatusTypeMidiaUsage] = useState('idle'); // ['loading', 'error', 'success', 'idle]

    const isLoadingMidiasUsage = statusMidiasUsage === 'loading';
    const isErrorMidiasUsage = statusMidiasUsage === 'error';
    const isLoadingTypeMidiaUsage = statusTypeMidiaUsage === 'loading';
    const isErrorTypeMidiaUsage = statusTypeMidiaUsage === 'error';

    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const configModalMidiasUsage = () => {
        return {
            title: `Taxa de Utilização de Mídias nos Exercícios`,
            centered: true,
            content: (
                <Space direction="vertical">
                    <span><strong>Total de exercícios:</strong> {metricsDataMidiasUsage?.totalExercicios}</span>
                    <span><strong>Total de exercícios com mídias:</strong> {metricsDataMidiasUsage?.midiasComExercicios}</span>
                    <span><strong>Taxa de utilizacao:</strong> {metricsDataMidiasUsage?.withUse}%</span>
                </Space>
            ),
        }
    }

    const configModalCancellationRate = () => {
        return {
            title: 'Taxa de uso de mídias por tipo',
            centered: true,
            content: (
                <Space direction="vertical">
                    <span><strong>Total de Mídias criadas:</strong> {metricsDataTypeMidiaUsage?.totalMidias}</span>
                    <span><strong>Total de Vídeos:</strong> {metricsDataTypeMidiaUsage?.totalVideos}</span>
                    <span><strong>Total de Imagens:</strong> {metricsDataTypeMidiaUsage?.totalImagens}</span>
                    <span><strong>Total de GIFs:</strong> {metricsDataTypeMidiaUsage?.totalGifsLong}</span>
                    <span><strong>Taxa de uso de Vídeos:</strong> {metricsDataTypeMidiaUsage?.taxaVideos}%</span>
                    <span><strong>Taxa de uso de Imagens:</strong> {metricsDataTypeMidiaUsage?.taxaImagens}%</span>
                    <span><strong>Taxa de uso de GIFs:</strong> {metricsDataTypeMidiaUsage?.taxaGifs}%</span>
                </Space>
            ),
        }
    }

    const fetchDataMidiasUsage = async () => {
        setStatusMidiasUsage('loading');

        let response
        let error = false

        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/fisioterapeuta/taxa-criacao/2023`)
            .then((res) => {
                response = res.data;
            }
            ).catch((err) => {
                if (err.response.status === 400) {
                    error = true
                    setMetricsDataMidiasUsage(undefined)
                    return
                }
                else
                    setStatusMidiasUsage('error');
            })
            .finally(() => {
                if (!error)
                    setMetricsDataMidiasUsage(response);
                console.log(metricsDataMidiasUsage)
                setStatusMidiasUsage('success');
            })
    };

    const fetchDataCancellation = async () => {
        setStatusTypeMidiaUsage('loading');

        let response
        let error = false

        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/midia/taxa-utilizacao`)
            .then((res) => {
                response = res.data;
            }
            ).catch((err) => {
                if (err.response.status === 400) {
                    error = true
                    setMetricsDataTypeMidiaUsage(undefined)
                    return
                }
                else
                    setStatusTypeMidiaUsage('error');
            })
            .finally(() => {
                if (!error)
                    setMetricsDataTypeMidiaUsage({
                        totalMidias: response.totalMidias,
                        totalVideos: response.totalVideos,
                        totalImagens: response.totalImagens,
                        totalGifsLong: response.totalGifsLong,
                        taxaVideos: response.taxaVideos,
                        taxaImagens: response.taxaImagens,
                        taxaGifs: response.taxaGifs,
                    });

                setStatusTypeMidiaUsage('success');
            })
    }

    useEffect(() => {
        fetchDataMidiasUsage();
        fetchDataCancellation();
    }, []);

    const MidiasUsageData = {
        labels: metricsDataMidiasUsage ? metricsDataMidiasUsage.map((data) => data.mes) : [],
        datasets: [
            {
                data: metricsDataMidiasUsage ? metricsDataMidiasUsage.map((data) => data.numNovosCadastros) : [],
                backgroundColor: ['#0BBFD9', '#00c3a5', '#ffbb00'],
                hoverBackgroundColor: ['#23d1eb', '#37dec4', '#ffcc37'],
            }
        ]
    };

    const typeMidiasUsageData = {
        labels: [''],
        datasets: [
            {
                label: 'Imagens',
                data: [metricsDataTypeMidiaUsage?.taxaImagens || 0],
                backgroundColor: '#0BBFD9',
                hoverBackgroundColor: '#23d1eb',
                barPercentage: 0.7,
            },
            {
                label: 'Vídeos',
                data: [metricsDataTypeMidiaUsage?.taxaVideos || 0],
                backgroundColor: '#00c3a5',
                hoverBackgroundColor: '#37dec4',
                barPercentage: 0.7,
            },
            {
                label: 'GIFs',
                data: [metricsDataTypeMidiaUsage?.taxaGifs || 0],
                backgroundColor: '#ffbb00',
                hoverBackgroundColor: '#ffcc37',
                barPercentage: 0.7,
            },
        ],
    };

    // return (
    //     <></>
    // )

    return (
        <ReachableContext.Provider value="Light">
            <ProcessContainer
                processName={"Gerenciar Mídias"}
                processNumber={7}
                chartsContainer={<Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Col span={12}>
                        <LineMetricCard
                            title={`Taxa de Utilização de Mídias nos Exercícios`}
                            objectives="Avaliar a utilização das mídias nos exercícios prescritos."
                            description="Calcula a porcentagem de exercícios que envolvem o uso de mídias (vídeos, imagens, GIFs) em relação ao total de exercícios prescritos."
                            chartData={MidiasUsageData}
                            loading={isLoadingMidiasUsage}
                            error={isErrorMidiasUsage || !metricsDataMidiasUsage}
                            moreDataOpener={<CenteredButton
                                onClick={async () => {
                                    modal.info(configModalMidiasUsage());
                                }}
                            >
                                Exibir mais detalhes
                            </CenteredButton>}
                        />
                    </Col>

                    <Col span={12}>
                        <LineMetricCard
                            title="Taxa de Uso de Mídias por Tipo"
                            objectives="Identificar preferências de utilização de diferentes tipos de mídia."
                            description="Mede a porcentagem de uso de cada tipo de mídia (vídeo, imagem, GIF) em relação ao total."
                            chartData={typeMidiasUsageData}
                            loading={isLoadingTypeMidiaUsage}
                            error={isErrorTypeMidiaUsage || !metricsDataTypeMidiaUsage}
                            moreDataOpener={<CenteredButton
                                onClick={async () => {
                                    modal.info(configModalCancellationRate());
                                }}
                            >
                                Exibir mais detalhes
                            </CenteredButton>}
                        />
                    </Col>
                </Row>}
            />

            {contextHolder}

            <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>
    );
};

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

export default Processo4;