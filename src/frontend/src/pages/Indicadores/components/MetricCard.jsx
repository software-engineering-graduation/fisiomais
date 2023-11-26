// MetricCard.js
import React from 'react';
import { Card, Divider } from 'antd';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Popover, Typography } from 'antd';
import styled from 'styled-components';

ChartJS.register(ArcElement, Tooltip, Legend);

const { Title } = Typography;

const MetricCard = ({ title, objectives, description, chartData, cardHeaderInput=null  }) => {
  const titlePopOver = (
    <>
      <WrapedMaxWidthParagraph>
        <span><strong>Objetivos: </strong>{objectives}</span>
      </WrapedMaxWidthParagraph>
      <Divider />
      <WrapedMaxWidthParagraph>
        <span><strong>Descrição: </strong>{description}</span>
      </WrapedMaxWidthParagraph>
    </>
  );

  return (
    <Card>
      <CardHeaderContainer>
        <Popover content={titlePopOver}>
          <TitleContainer style={{ cursor: 'help' }}>
            <Title level={4}>
              {title}
            </Title>
          </TitleContainer>
        </Popover>
        {cardHeaderInput}
      </CardHeaderContainer>
      <Divider />
      <Pie data={chartData} />
    </Card>
  );
};

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

export default MetricCard;