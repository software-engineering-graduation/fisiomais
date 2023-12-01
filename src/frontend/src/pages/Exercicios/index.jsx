import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Divider, Result, notification } from 'antd';

import TableHeader from './components/TableHeader';
import MidiasTable from './components/MidiasTable';
import axios from 'axios';

const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
    },
    {
        title: 'Descrição',
        dataIndex: 'descricao',
    },
    {
        title: 'Quantidade de Mídias',
        dataIndex: 'midiasLength',
    },
    {
        title: 'Data de criação',
        dataIndex: 'createTime',
    }
];

const SELECTED = true

const Exercicios = () => {

    const [shortMidias, setShortMidias] = useState([]);
    const [deletionStack, setDeletionStack] = useState([]);
    const [deleteMidias, setDeleteMidias] = useState(false);
    const [loadingMidias, setLoadingMidias] = useState(true);
    const [loadingDeletion, setLoadingDeletion] = useState(false);
    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    if (currentUser.user.role === 'paciente') {
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
            const dateA = new Date(a.createTime);
            const dateB = new Date(b.createTime);
            if (dateA < dateB) {
                return -1;
            }
            if (dateA > dateB) {
                return 1;
            }
            return 0;
        }
        );
    }

    const fetchDeletedMidias = async (ids) => {
        let finalError = {};
        const stringListOfIds = ids.map(item => item).join(',');
        await axios.delete(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/exercicio/${stringListOfIds}`).
            then(response => {
                if (response.status !== 200) {
                    finalError = response;
                }
            }
            ).catch(error => {
                // console.log(error)
                finalError = error;
            }).
            finally((error) => {
            });

        return finalError;
    }

    const fetchDeletedMidia = async (id) => {
        let finalError = {};
        await axios.delete(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/exercicio/${id}`).
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
        let apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/exercicio`
        if(currentUser.user.role === 'fisioterapeuta') {
            apiRoute += `/owner/${currentUser.user.id}`;
        }            

        await axios.get(apiRoute).
            then(response => {
                const data = response.data.map(midia => {
                    const { id, nome, descricao, midias, createTime } = midia;

                    const dispatchMidiaData = (id) => (event) => {
                        event.preventDefault();
                        navigate(`/exercicio/${id}`);
                    }

                    const routeToMidia = (titulo, id) => {
                        return <a
                            onClick={dispatchMidiaData(id)}>
                            {nome}
                        </a>
                    }

                    const titleComponent = routeToMidia(nome, id);

                    return {
                        key: id,
                        id,
                        nome: titleComponent,
                        descricao: descricao.substring(0, 50) + '...',
                        midiasLength: midias.length,
                        createTime
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
        if (!deleteMidias)
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

    const handleMediaDeletion = async () => {
        const deleteOneByOne = process.env.API_TYPE === 'json' ? true : false;
        let erroShown = false

        if (deleteOneByOne) {
            // console.log(`Deleting one by one: ${deletionStack}`)
            deletionStack.forEach(async element => {
                if (!erroShown) {
                    const resp = await fetchDeletedMidia(element);

                    if (resp.response.data.message) {
                        find = shortMidias.find(item => item.id === element);
                        openNotification('error', `Deletar Mídias: ${find.titulo.props.children}`, resp.response.data.message);
                        erroShown = true;
                    }
                }
            });
        } else {
            // console.log(`Deleting all at once: ${deletionStack}`)
            const resp = await fetchDeletedMidias(deletionStack);
            if (resp.message) {
                openNotification('error', `Deletar Mídias`, resp.response.data.message);
            }
        }

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
export default Exercicios;