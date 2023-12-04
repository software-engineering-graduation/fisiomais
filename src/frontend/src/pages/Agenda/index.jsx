import React, { useState, useEffect } from 'react';
import { HeaderTable } from "./components/HeaderTable";
import { TableTop } from "./components/TableTop";
import { ContentLine } from "./components/ContentLine/ContentLine";
import { Filters } from "./components/FiltersLine/Filters";
import axios from 'axios';
import { useSelector } from 'react-redux';

const Agenda = () => {
    const [consultas, setConsultas] = useState([]);
    const [filtroData, setFiltroData] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const currentUser = useSelector(state => state.currentUser.value);
    const { token } = currentUser;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const userRole = currentUser.user.role

    useEffect(() => {
        fetchConsultas();
    }, []);

    const fetchConsultas = async () => {
        try {
            let apiUrl = `http://localhost:8081/api/consulta`
            if(userRole === 'fisioterapeuta'){
                apiUrl += `/fisioterapeuta/${currentUser.user.id}`
            }
            else if(userRole === 'paciente'){
                apiUrl += `/paciente/${currentUser.user.id}`
            }
            else{
                apiUrl += `/all`
            }
            const response = await axios.get(apiUrl);
            setConsultas(response.data);
            // console.log("request data:", response.data);
        } catch (error) {
            // console.error("Erro ao buscar consultas", error);
        }
    };

    const handleDataChange = (event) => {
        setFiltroData(event.target.value);
    };

    const handleStatusChange = (event) => {
        setFiltroStatus(event.target.value);
    };

    const consultasFiltradas = consultas.filter((consulta) => {
        return (
            (!filtroData || consulta.dataEHora === filtroData) &&
            (!filtroStatus || consulta.confirmacao === filtroStatus)
        );
    });

    // console.log(consultasFiltradas);

    const handleDelete = async (idToDelete) => {
        try {
            await axios.delete(`http://localhost:8081/api/consulta/${idToDelete}`);
            fetchConsultas();
        } catch (error) {
            // console.error('Erro ao deletar consulta', error);
        }
    };
        
    
    return (
        <div className="container mx-auto px-4 py-8">
            <HeaderTable />
            
            <Filters
                totalAppointments={consultasFiltradas.length}
                statusOptions={["Todos", "Confirmado", "Pendente", "Cancelado", "Realizado"]}
                onStatusChange={handleStatusChange}
            />

            <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
                <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                    <TableTop />
                    <tbody>
                        {consultasFiltradas.map((consulta, i) => (
                            <ContentLine
                                key={i}
                                id={consulta.id}
                                paciente={consulta.paciente}
                                fisioterapeuta={consulta.fisioterapeuta}
                                dataHora={consulta.dataEHora}
                                status={consulta.status}
                                observacoes={consulta.observacoes}
                                linkConsulta={consulta.link}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Agenda;
