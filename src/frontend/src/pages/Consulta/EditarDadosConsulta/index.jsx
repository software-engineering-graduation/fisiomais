import React, { useEffect, useState } from 'react';
import DadosConsulta from '../DadosConsulta';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Result } from 'antd';


const EditarDadosConsulta = () => {
    const [fetchStatus, setFetchStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);
    const [consulta, setConsulta] = useState(null);
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

    const fetchConsulta = async () => {
        const consultaId = window.location.href.split('/').pop();
        setFetchStatus('loading');
        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/consulta/id/${consultaId}`
        axios.get(apiRoute)
            .then((response) => {
                setConsulta(response.data);
                setFetchStatus('succeeded');
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setFetchStatus('failed');
            })
    }

    useEffect(() => {
        fetchConsulta();
    }, []);

    if (isLoading) {
        return (
            <Result title="Carregando dados da consulta..." />
        );
    }

    if (isFailed) {
        return (
            <Result status="error"
                title="Erro ao carregar dados da consulta"
                subTitle={errorMessage}
            />
        );
    }

    return (
        <>
            {isSuccess && consulta && (
                <DadosConsulta consulta={consulta} />
            )}
        </>
    );
};

export default EditarDadosConsulta;