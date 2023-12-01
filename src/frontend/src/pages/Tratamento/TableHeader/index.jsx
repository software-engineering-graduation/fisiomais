import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Select } from 'antd';
// icons
import { MdAdd } from 'react-icons/md';

const { Option } = Select;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
`

const ButtonContainer = styled.div`
    .ant-btn-default:hover {
        color: #0BD980 !important;
        border-color: #0BD980 !important;
    }
`

const HeadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`

const TableHeader = ({ pacientes, onChange, isPaciente = false }) => {
    const [selectedPaciente, setSelectedPaciente] = useState('');

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const handlePacienteChange = debounce((value) => {
        setSelectedPaciente(value);
        onChange(value);
    }, 500);

    const orderPacientes = (pacientes) => {
        const orderedPacientes = pacientes.sort((a, b) => {
            if (a.nome > b.nome) {
                return 1;
            }
            if (a.nome < b.nome) {
                return -1;
            }
            return 0;
        }).filter((paciente, index, self) =>
            index === self.findIndex((t) => (
                t.nome === paciente.nome
            ))
        );
        return orderedPacientes;
    }

    return (
        <HeadContainer>
            <h1>Tratamentos</h1>

            {!isPaciente && (
                <ButtonsContainer>
                    <ButtonContainer>
                        <LabelSelect>Filtrar por paciente:</LabelSelect>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            allowClear={true}
                            optionFilterProp="children"
                            onChange={handlePacienteChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={selectedPaciente}
                        >
                            {orderPacientes(pacientes).map((paciente) => (
                                <Option key={paciente.id} value={paciente.id}>
                                    {paciente.nome}
                                </Option>
                            ))}
                        </Select>
                    </ButtonContainer>
                </ButtonsContainer>)}
        </HeadContainer>
    );
}

export default TableHeader;

const LabelSelect = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
`