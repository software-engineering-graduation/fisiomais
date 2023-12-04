import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Result, notification } from 'antd';

import TableHeader from './components/TableHeader';
import TableDisp from './components/TableDisp';

import axios from 'axios';

const columns = [
    {
        title: 'Disponibilidade',
        dataIndex: 'disponibilidade',
    },
    {
        title: 'Dia da semana',
        dataIndex: 'diaSemana',
    },
    {
        title: 'Horário',
        dataIndex: 'horario',
    }
];

const SELECTED = true

const Disponibilidade = () => {
    const navigate = useNavigate();

    const [disponibilidades, setDisponibilidades] = useState([]);
    const [deletionStack, setDeletionStack] = useState([]);
    const [deleteDisponibilidades, setDeleteDisponibilidades] = useState(false);
    const [loadingDisponibilidades, setLoadingDisponibilidades] = useState('idle');
    const [loadingDeletion, setLoadingDeletion] = useState('idle');
    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (currentUser.user.role !== 'fisioterapeuta') {
        return (
            <Result title="Usuário não tem permissão para acessar essa página"
                subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
            </Result>
        )
    }

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (type, title, description) => {
        api[type]({
            message: title,
            description: description,
            duration: 2,
            placement: 'bottomRight',
        });
    };

    const weekDayName = (weekDayNumber) => {
        switch (weekDayNumber) {
            case 1:
                return 'Segunda-feira';
            case 2:
                return 'Terça-feira';
            case 3:
                return 'Quarta-feira';
            case 4:
                return 'Quinta-feira';
            case 5:
                return 'Sexta-feira';
            case 6:
                return 'Sábado';
            case 7:
                return 'Domingo';
            default:
                return 'Dia da semana inválido';
        }
    }

    const fetchDisponibilidades = async (type = null) => {
        setLoadingDisponibilidades('loading');
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/agenda/fisioterapeuta/${currentUser.user.id}`
        axios.get(apiRoute)
            .then((response) => {
                const data = response.data.map(item => {
                    const { id, dia, horarioInicio, horarioFim, disponivel } = item;
                    const avaibleTimeRange = `${horarioInicio} - ${horarioFim}`;
                    const diaSemanaNomeParsed = weekDayName(dia);
                    const disponOrnot = disponivel ? 'Disponível' : 'Indisponível';

                    return {
                        key: id,
                        id,
                        disponibilidade: disponOrnot,
                        diaSemana: diaSemanaNomeParsed,
                        horario: avaibleTimeRange,
                    }
                })
                console.log('data', data);
                if (type === 'disponivel')
                    setDisponibilidades(data.filter(item => item.disponibilidade === 'Disponível'));
                else if (type === 'indisponivel')
                    setDisponibilidades(data.filter(item => item.disponibilidade === 'Indisponível'));
                else
                    setDisponibilidades(data);
                setLoadingDisponibilidades('succeeded');
            })
            .catch((error) => {
                console.error(error);
                setLoadingDisponibilidades(false);
                setLoadingDisponibilidades('failed');
            })
    }

    const fetchDeletedDisponibilidades = async (ids) => {
        let finalError = {};
        const stringListOfIds = ids.map(item => item).join(',');
        await axios.delete(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/agenda/${stringListOfIds}`).
            then(response => {
                if (response.status !== 200) {
                    finalError = response;
                }
            }
            ).catch(error => {
                console.log(error)
                finalError = error;
            }).
            finally((error) => {
            });

        return finalError;
    }

    useEffect(() => {
        if (!deleteDisponibilidades)
            fetchDisponibilidades();
    }, [deleteDisponibilidades]);

    const activateDeletion = () => {
        setDeleteDisponibilidades(true);
    }

    const getPageSizeBasedOnScreenSize = () => {
        const width = window.innerWidth;
        if (width <= 1600) {
            return {
                pageSize: 6,
            }
        }
        return {
            pageSize: 10,
        }
    }

    const handleDisponibilidadeDeletion = async () => {
        const resp = await fetchDeletedDisponibilidades(deletionStack);
        if (resp.message) {
            openNotification('error', 'Erro ao deletar disponibilidade', resp.message);
        }
        else{
            openNotification('success', 'Disponibilidade(s) deletada(s) com sucesso', '');
        }

        setDeletionStack([]);
        setDeleteDisponibilidades(false);
    }

    const handleTypeDisponibilidadeSelection = (value) => {
        console.log('value', value);
        switch (value) {
            case 'Todos':
                fetchDisponibilidades();
                break;
            case 'Disponível':
                fetchDisponibilidades('disponivel');
                break;
            case 'Indisponível':
                fetchDisponibilidades('indisponivel');
                break;
            default:
                break;
        }
    }

    const handleRowSelection = (id, event) => {
        if (event === SELECTED) {
            if (!deletionStack.includes(id)) {
                const newStack = deletionStack;
                newStack.push(id);
                setDeletionStack(newStack);
            }
            return;
        }

        if (deletionStack.includes(id)) {
            const filteredStack = deletionStack.filter(item => item !== id);
            setDeletionStack(filteredStack);
        }
    }

    const cancelDeletion = () => {
        setDeletionStack([]);
        setDeleteDisponibilidades(false);
    }

    return (
        <div>
            {contextHolder}
            <TableHeader
                deleteDisponibilidades={deleteDisponibilidades}
                activateDeletion={activateDeletion}
                cancelDeletion={cancelDeletion}
                handleDeletion={handleDisponibilidadeDeletion}
                handleTypeDisponibilidadeSelection={handleTypeDisponibilidadeSelection}
                typeSelection={true}
                onChangeTypeSelection={handleTypeDisponibilidadeSelection}
            />
            <TableDisp
                handleDisponibilidadeDeletion={handleDisponibilidadeDeletion}
                handleRowSelection={handleRowSelection}
                getPageSizeBasedOnScreenSize={getPageSizeBasedOnScreenSize}
                disponibilidades={disponibilidades}
                columns={columns}
                deleteDisponibilidades={deleteDisponibilidades}
                loadingDisponibilidades={loadingDisponibilidades === 'loading' ? true : false}
            />
        </div>
    )
}

export default Disponibilidade;