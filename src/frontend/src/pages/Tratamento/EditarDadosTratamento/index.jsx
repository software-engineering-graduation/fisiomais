import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Form, Result } from 'antd';
import styled from 'styled-components';
import NovoTratamento from '../NovoTratamento';


const EditarDadosTratamento = () => {
    const [form] = Form.useForm();
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);
    const [tratamento, setTratamento] = useState(null);
    const [owner, setOwner] = useState('loading');
    const currentUser = useSelector(state => state.currentUser.value);
    const role = currentUser.role;
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentUser.token}`;

    const isLoading = fetchStatus === 'loading';
    const isSuccess = fetchStatus === 'succeeded';
    const isFailed = fetchStatus === 'failed';

    if (role === 'paciente') {
        return (
            <Result title="Usuário não tem permissão para acessar essa página"
                subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
            </Result>
        );
    }

    const fetchTratamento = async () => {
        const consultaId = window.location.href.split('/').pop();
        setFetchStatus('loading');
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/${consultaId}`
        axios.get(apiRoute)
            .then((response) => {
                setTratamento(response.data);
                setFetchStatus('succeeded');
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setOwner(false);
                }
                setErrorMessage(error.message);
                setFetchStatus('failed');
            })
    }

    useEffect(() => {
        fetchTratamento();
    }, []);

    if (isLoading) {
        return (
            <Result title="Carregando dados do tratamento..." />
        );
    }

    if (isFailed) {

        if (owner === false) {
            return (
                <Result title="Usuário não tem permissão para acessar essa página"
                    subTitle="Desculpe, ocorreu um erro ao buscar os detalhes de usuário">
                </Result>
            );
        }

        return (
            <Result status="error"
                title="Erro ao carregar dados do tramento"
                subTitle={errorMessage}
            />
        );
    }

    const onFinish = async (values) => {
        console.log(values);
    };

    return (
        <>
            {isSuccess && tratamento && (
                <NovoTratamento tratamento={tratamento} />
            )}
        </>
    );
};

export default EditarDadosTratamento;

const ShowStaticDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;