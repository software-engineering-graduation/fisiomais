import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Divider, Result, notification } from 'antd';

import TratamentosTable from './TratamentosTable';
import axios from 'axios';
import TableHeader from './TableHeader';

const columns = [
  {
    title: 'Título',
    dataIndex: 'titulo',
  },
  {
    title: 'Paciente',
    dataIndex: 'paciente',
  },
  {
    title: 'Observações',
    dataIndex: 'observacoes',
  },
  {
    title: 'Previsão de término',
    dataIndex: 'endDate',
  }
];

const Tratamento = () => {

  const [tratamentos, setTratamentos] = useState([]);
  const [deletionStack, setDeletionStack] = useState([]);
  const [deleteTratamentos, setDeleteTratamentos] = useState(false);
  const [loadingTratamentos, setLoadingTratamentos] = useState(true);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [pacientes, setPacientes] = useState([]);

  const currentUser = useSelector(state => state.currentUser.value);
  const { token } = currentUser;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const userRole = currentUser.user.role;
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

  const orderedData = (data) => {
    return data.sort((a, b) => {
      const aEndDate = new Date(a.endDate);
      const bEndDate = new Date(b.endDate);
      if (aEndDate < bEndDate) {
        return -1;
      }
      if (aEndDate > bEndDate) {
        return 1;
      }
      return 0;
    }
    );
  }

  const fetchDeletedTratamentos = async (ids) => {
    let finalError = {};
    const stringListOfIds = ids.map(item => item).join(',');
    await axios.delete(`${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento/${stringListOfIds}`).
      then(response => {
        if (response.status !== 200) {
          finalError = response;
        }
      }
      ).catch(error => {
        finalError = error;
      })

    return finalError
  }

  useEffect(() => {
    if (!deleteTratamentos) {
      fetchTratamentos();
    }
  }, [deleteTratamentos]);

  const fetchTratamentos = async () => {
    setLoadingTratamentos(true);
    let apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/tratamento`

    if (userRole === 'paciente') {
      apiRoute += `/paciente/${currentUser.user.id}`;
    }
    else if (userRole === 'fisioterapeuta') {
      apiRoute += `/fisioterapeuta/${currentUser.user.id}`;
    }

    if (userRole === 'admin' || userRole === 'fisioterapeuta') {
      if (selectedPaciente) {
        apiRoute += `/paciente/${selectedPaciente}`;
      }
    }

    await axios.get(apiRoute).
      then(response => {
        const data = response.data.map(tratamento => {
          const { id, endDate, feedback, fisioterapeuta, paciente, titulo, observacoes } = tratamento;
          setPacientes(pacientes => [...pacientes, paciente]);

          const dispatchTratamentoData = (id) => (event) => {
            event.preventDefault();
            navigate(`/tratamento/${id}`);
          }

          const routeToTratamento = (titulo, id) => {
            return <a
              onClick={dispatchTratamentoData(id)}>
              {titulo}
            </a>
          }

          const titleComponent = routeToTratamento(titulo, id);

          return {
            key: id,
            id,
            titulo: titleComponent,
            descricao: observacoes.substring(0, 50) + '...',
            endDate,
            paciente: paciente.nome,
            fisioterapeuta,
            observacoes,
            feedback,
          }
        });

        setTratamentos(orderedData(data));
      }
      ).catch(error => {
        openNotification('error', 'Listar Tratamentos', 'Erro ao os tratamentos!');
      }).
      finally(() => {
        setLoadingTratamentos(false);
      });
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

  const activateDeleteTratamentos = () => {
    setDeleteTratamentos(true);
  }

  const cancelDeletion = () => {
    setDeleteTratamentos(false);
    setDeletionStack([]);
  }

  const handleTratamentoDeletion = async () => {
    const resp = await fetchDeletedTratamentos(deletionStack);
    if (resp.message) {
      openNotification('error', `Deletar Tratamentos`, resp.response.data.message);
    } else {
      openNotification('success', 'Deletar Tratamentos', 'Tratamentos deletados com sucesso!');
    }

    setDeleteTratamentos(false);
    setDeletionStack([]);
  }

  const handleRowSelection = (id, event) => {
    if (event === true) {
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

  return (
    <div>
      {contextHolder}
      <TableHeader
        pacientes={pacientes}
        onChange={(pacienteId) => setSelectedPaciente(pacienteId)}
        isPaciente={userRole === 'paciente'}
        deleteTratamentos={deleteTratamentos}
        activateDeleteTratamentos={activateDeleteTratamentos}
        cancelDeleteTratamentos={cancelDeletion}
        handleTratamentoDeletion={handleTratamentoDeletion}
      />
      <Divider />
      <TratamentosTable
        getPageSizeBasedOnScreenSize={getPageSizeBasedOnScreenSize}
        tratamentos={tratamentos}
        columns={columns}
        loading={loadingTratamentos}
        handleRowSelection={handleRowSelection}
        deleteTratamentos={deleteTratamentos}
      />
    </div>
  );
};
export default Tratamento;