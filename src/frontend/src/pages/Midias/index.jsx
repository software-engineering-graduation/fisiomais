import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentMedia } from '../../store/mediaDetail'
import { Divider, Result, notification } from 'antd';

import TableHeader from './components/TableHeader';
import MidiasTable from './components/MidiasTable';
import axios from 'axios';

const columns = [
    {
        title: 'Título',
        dataIndex: 'titulo',
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
    },
    {
        title: 'Data de criação',
        dataIndex: 'created_at',
    }
];

const SELECTED = true

const Midias = () => {
    const [shortMidias, setShortMidias] = useState([]);
    const [deletionStack, setDeletionStack] = useState([]);
    const [deleteMidias, setDeleteMidias] = useState(false);
    const [loadingMidias, setLoadingMidias] = useState(true);
    const [loadingDeletion, setLoadingDeletion] = useState(false);
    const currentUser = useSelector(state => state.currentUser.value);

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

    const navigate = useNavigate();

    // most recent first
    const orderedData = (data) => {
        return data.sort((a, b) => {
            if (a.created_at > b.created_at) {
                return -1;
            }
            if (a.created_at < b.created_at) {
                return 1;
            }
            return 0;
        }
        );
    }

    const fetchDeletedMidias = async (id) => {
        let finalError = {};
        await axios.delete(`${import.meta.env.VITE_API_BASE_ROUTE}/midia/${id}`).
            then(response => {
                if (response.status !== 200) {
                    finalError = response;
                }
            }
            ).catch(error => {
                finalError = error;
            }).
            finally((error) => {
            });

        return finalError;
    }

    const fetchMidias = async () => {
        setLoadingMidias(true);
        // FIXME - simulate delay to show loadingMidias

        await axios.get(`${import.meta.env.VITE_API_BASE_ROUTE}/midia?fisioterapeuta_id=${currentUser.userId}`).
            then(response => {
                const data = response.data.map(midia => {
                    const { id, titulo, descricao, tipo, created_at } = midia;
                    const formatedDate = new Date(created_at).toLocaleString('pt-BR');

                    const dispatchMidiaData = (id) => (event) => {
                        event.preventDefault();
                        navigate(`/midia/${id}`);
                    }

                    const routeToMidia = (titulo, id) => {
                        return <a
                            onClick={dispatchMidiaData(id)}>
                            {titulo}
                        </a>
                    }

                    const titleComponent = routeToMidia(titulo, id);

                    return {
                        key: id,
                        id,
                        titulo: titleComponent,
                        descricao: descricao.substring(0, 50) + '...',
                        tipo,
                        created_at: formatedDate,
                    }
                });

                setShortMidias(orderedData(data));
            }
            ).catch(error => {
                openNotification('error', 'Listar Mídias', 'Erro ao listar mídias!');
            }).
            finally(() => {
                setLoadingMidias(false);
            });
    }

    useEffect(() => {
        fetchMidias();
    }, [deleteMidias]);

    const activateDeleteMidias = () => {
        setDeleteMidias(true);
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

    const handleMediaDeletion = () => {
        // FIXME - fix when backend is ready, to delete from array if ids
        let erroShown = false
        deletionStack.forEach(async element => {
            if (!erroShown) {
                const resp = await fetchDeletedMidias(element);

                if (resp.message) {
                    find = shortMidias.find(item => item.id === element);
                    openNotification('error', `Deletar Mídias: ${find.titulo.props.children}`, resp.message);
                    erroShown = true;
                }
            }
        });

        if (!erroShown) {
            openNotification('success', 'Deletar Mídias', 'Mídias deletadas com sucesso!');
        }

        setDeleteMidias(false);
        setDeletionStack([]);
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
        setDeleteMidias(false);
        setDeletionStack([]);
    }
    return (
        <div>
            {contextHolder}
            <TableHeader
                deleteMidias={deleteMidias}
                activateDeleteMidias={activateDeleteMidias}
                cancelDeletion={cancelDeletion}
                handleMediaDeletion={handleMediaDeletion}
            />
            <Divider />

            <MidiasTable
                handleMediaDeletion={handleMediaDeletion}
                handleRowSelection={handleRowSelection}
                getPageSizeBasedOnScreenSize={getPageSizeBasedOnScreenSize}
                shortMidias={shortMidias}
                columns={columns}
                deleteMidias={deleteMidias}
                loadingMidias={loadingMidias}
            />
        </div>
    );
};
export default Midias;