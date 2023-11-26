// Indicadores.jsx
import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

// Process
import Processo1 from 'pages/Indicadores/process/Processo1';

const Indicadores = () => {
  return (
    <>
      <h1>Indicadores</h1>
      <AllMetricsContanier>
        <Processo1/>
        <Divider/>
        {/* TODO - add other indicators here */}
      </AllMetricsContanier>
    </>
  );
};

export default Indicadores;

const AllMetricsContanier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
`;