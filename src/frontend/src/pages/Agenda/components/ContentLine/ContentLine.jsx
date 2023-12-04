import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

import { Status } from "../../components/Status/Status";
import { IconMore } from "../../icons/IconMore";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";

export const ContentLine = ({ id, paciente, fisioterapeuta, dataHora, status, observacoes, linkConsulta, onDelete }) => {
    const [showIcons, setShowIcons] = useState(false);
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        Modal.confirm({
            title: 'Você tem certeza que quer deletar esta consulta?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta ação não pode ser desfeita.',
            okText: 'Sim, deletar',
            okType: 'danger',
            cancelText: 'Não, cancelar',
            onOk: () => onDelete(id)
        });
    };

    // console.log("status", status)

    const handleEditClick = () => {
        navigate('/nova-consulta', { state: { consulta: { id, paciente, fisioterapeuta, dataHora, status, observacoes, linkConsulta } } });
    };

    return (
        <tr onMouseEnter={() => setShowIcons(true)} onMouseLeave={() => setShowIcons(false)}>
            <td className="px-4 text-left">{paciente.nome}</td>
            <td className="px-4 text-left">{fisioterapeuta.nome}</td>
            <td className="px-4 text-left">{dataHora}</td>
            <td className="px-4 text-left">
                <Status status={status} />
            </td>
            <td className="px-4 text-left">{observacoes}</td>
            <td className="px-4 text-left">
                <a href={linkConsulta} target="_blank" rel="noopener noreferrer">Link Consulta</a>
            </td>
            <td>
                <div className="flex items-center justify-end space-x-2">
                    {showIcons && (
                        <>
                            <IconEdit onClick={handleEditClick} />
                            <IconDelete onClick={handleDeleteClick} />
                        </>
                    )}
                    <IconMore />
                </div>
            </td>
        </tr>
    );
};

ContentLine.propTypes = {
    id: PropTypes.number.isRequired,
    paciente: PropTypes.shape({
        nome: PropTypes.string.isRequired,
    }).isRequired,
    fisioterapeuta: PropTypes.shape({
        nome: PropTypes.string.isRequired,
    }).isRequired,
    dataHora: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    observacoes: PropTypes.string,
    linkConsulta: PropTypes.string,
    onDelete: PropTypes.func.isRequired
};

export default ContentLine;
