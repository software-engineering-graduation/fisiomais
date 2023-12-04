import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Select } from 'antd';

// icons
import { MdAdd, MdOutlineCancel } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';

const { Option } = Select;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
`

const CreateDispButtonContainer = styled.div`
    .ant-btn-default:hover {
        color: #0BD980 !important;
        border-color: #0BD980 !important;
    }
`

const DeleteDispButtonContainer = styled.div`
    .ant-btn-default:hover {
        color: #F95E5A !important;
        border-color: #F95E5A !important;
    }
`

const ConfirmDeleteDispsButtonContainer = styled.div`
    .ant-btn-default {
        background-color: #F95E5A !important;
        color: white !important;
        border-color: white !important;
    }

    .ant-btn-default:hover {
        background-color: #fa8c89 !important;
        color: white !important;
        border-color: white !important;
    }
`

const HeadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`

const TitleAndFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;

    h1 {
        font-size: 24px;
        font-weight: 600;
    }
`

const TableHeader = ({ deleteDisponibilidades,
    activateDeletion,
    cancelDeletion,
    handleDeletion,
    typeSelection = null,
    onChangeTypeSelection = null }) => {
    const navigate = useNavigate();

    return (
        <HeadContainer>
            <TitleAndFilterContainer>
                <h1>Disponibilidades</h1>
                {typeSelection &&
                    <Select
                        defaultValue="Todos"
                        style={{ width: 120 }}
                        onChange={onChangeTypeSelection}
                    >
                        <Option value="Todos">Todos</Option>
                        <Option value="Disponível">Disponível</Option>
                        <Option value="Indisponível">Indisponível</Option>
                    </Select>
                }
            </TitleAndFilterContainer>

            <ButtonsContainer>
                {
                    !deleteDisponibilidades &&
                    <>
                        <CreateDispButtonContainer>
                            <Button
                                size="large"
                                icon={<MdAdd />}
                                onClick={() => navigate('/disponibilidade/criar')}
                            >
                                Criar disponibilidade
                            </Button>
                        </CreateDispButtonContainer>

                        <DeleteDispButtonContainer>
                            <Button
                                size='large'
                                icon={<AiOutlineDelete />}
                                onClick={() => activateDeletion()}
                            >
                                Deletar
                            </Button>
                        </DeleteDispButtonContainer>
                    </>
                }
                {
                    deleteDisponibilidades &&
                    <>
                        <Button
                            size="large"
                            icon={<MdOutlineCancel />}
                            onClick={() => cancelDeletion()}
                        >
                            Cancelar
                        </Button>

                        <ConfirmDeleteDispsButtonContainer>
                            <Button
                                size="large"
                                icon={<FaCheck />}
                                onClick={() => handleDeletion()}
                            >
                                Confirmar
                            </Button>
                        </ConfirmDeleteDispsButtonContainer>
                    </>

                }
            </ButtonsContainer>
        </HeadContainer>
    )
}

export default TableHeader;