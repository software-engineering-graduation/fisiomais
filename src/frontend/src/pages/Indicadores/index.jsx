import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { DatePicker, Divider, Typography, Popover } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

ChartJS.register(ArcElement, Tooltip, Legend);

const Indicadores = () => {
  const [metricsData, setMetricsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        backgroundColor: ['#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#FFCE56', '#FF6384'],
      },
    ],
  };

  const titlePopOver = (objetivos, descricao) => {
    return (
      <>
        <WrapedMaxWidthParagraph>
          <span><strong>Objetivos: </strong>{objetivos}</span>
        </WrapedMaxWidthParagraph>
        <Divider />
        <WrapedMaxWidthParagraph>
          <span><strong>Descrição: </strong>{descricao}</span>
        </WrapedMaxWidthParagraph>
      </>
    )
  }

  return (
    <>
      <h1>Indicadores</h1>
      <div>
        <Row gutter={16}
          style={{
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          <Col span={12}>
            <Card>
              <CardHeaderContainer>
                <Popover content={titlePopOver('Mensura a eficácia na confirmação das consultas agendadas mensalmente.',
                  'Calcula a porcentagem de consultas confirmadas em relação ao total de consultas agendadas em escala mensal.	')} >
                  <TitleContainer style={{
                    cursor: 'help'
                  }}>
                    <Title
                      level={4}
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                      }}
                    >
                      Taxa de confirmações de consultas mensais
                    </Title>
                  </TitleContainer>
                </Popover>
                <DatePicker picker="month"
                  onChange={(e) => console.log(e)}
                  autoComplete='on'
                  placeholder='Selecione o mês'
                />
              </CardHeaderContainer>
              <Divider />
              <Pie data={confirmationRateData} />
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              <CardHeaderContainer>
                <Popover content={titlePopOver('Minimizar cancelamentos.',
                  'Mede a porcentagem de agendamentos cancelados em relação ao total de agendamentos.')} >
                  <TitleContainer style={{
                    cursor: 'help'
                  }}>
                    <Title
                      level={4}
                      style={{
                        display: 'flex',
                        alignItems: 'start',
                      }}
                    >
                      Taxa de agendamentos cancelados
                    </Title>
                  </TitleContainer>
                </Popover>
              </CardHeaderContainer>
              <Divider />
              <Pie data={cancellationRateData} />
            </Card>
          </Col>
        </Row>
      </div >
    </>
  );
};
export default Indicadores;

const CardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapedMaxWidthParagraph = styled.p`
  font-size: 1rem;
  margin: 8px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 250px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
`;