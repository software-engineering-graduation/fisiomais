import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setCurrentMedia } from '../../store/mediaDetail'
import { Divider } from 'antd';

import midiasJson from './data/mock-data.json' // TODO - Remover mock data
import TableHeader from './components/TableHeader';
import MidiasTable from './components/MidiasTable';

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

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const data = midiasJson.midias.map(midia => {
        const { id, titulo, descricao, tipo, created_at } = midia;
        const formatedDate = new Date(created_at).toLocaleString('pt-BR');

        const dispatchMidiaData = (id) => (event) => {
            event.preventDefault();

            const midia = midiasJson.midias.find(midia => midia.id === id) ?? undefined;

            dispatch(setCurrentMedia(midia))

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

    // most recent first
    const orderedData = data.sort((a, b) => {
        if (a.created_at > b.created_at) {
            return -1;
        }
        if (a.created_at < b.created_at) {
            return 1;
        }
        return 0;
    }
    );

    useEffect(() => {
        setShortMidias(orderedData);
    }, []);

    useEffect(() => {
    }, [deletionStack]);

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
        // FIXME remove from shortMidias
        const filteredMidias = shortMidias.filter(midia => !deletionStack.includes(midia.id));
        setShortMidias(filteredMidias);

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
        <>
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
            />
        </>
    );
};
export default Midias;