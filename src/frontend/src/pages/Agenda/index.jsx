import React, { useState } from "react";
import { HeaderTable } from "./components/HeaderTable";
import { TableTop } from "./components/TableTop";
import { ContentLine } from "./components/ContentLine/ContentLine";
import { Filters } from "./components/FiltersLine/Filters";

const Agenda = () => {
  const [consultas, setConsultas] = useState([
    {
      id: 1,
      paciente: "Ana Silva",
      fisioterapeuta: "Dr. João Souza",
      dataHora: "2022-06-24T14:00",
      status: "Confirmado",
      observacoes: "Primeira sessão.",
    },
    {
      id: 2,
      paciente: "Ana ",
      fisioterapeuta: "Dr. João Souza",
      dataHora: "2023-06-09T14:00",
      status: "Pendente",
      observacoes: "Segunda Sessão.",
    },
    {
      id: 3,
      paciente: "Carlos Mendes",
      fisioterapeuta: "Dra. Maria Lima",
      dataHora: "2022-07-15T10:30",
      status: "Realizado",
      observacoes: "Terceira sessão, progresso notável.",
    },
    {
      id: 4,
      paciente: "Joana Araújo",
      fisioterapeuta: "Dr. Pedro Martins",
      dataHora: "2022-07-16T11:00",
      status: "Cancelado",
      observacoes: "Cancelado a pedido do paciente.",
    },
    {
      id: 5,
      paciente: "Luiz Costa",
      fisioterapeuta: "Dra. Camila Gonçalves",
      dataHora: "2022-07-17T09:00",
      status: "Confirmado",
      observacoes: "Primeira consulta após cirurgia.",
    },
    {
      id: 6,
      paciente: "Sofia Pereira",
      fisioterapeuta: "Dr. Lucas Andrade",
      dataHora: "2022-07-18T14:30",
      status: "Pendente",
      observacoes: "Aguardando confirmação do paciente.",
    },
  ]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  const handleDataChange = (event) => {
    setFiltroData(event.target.value);
  };

  const handleStatusChange = (event) => {
    setFiltroStatus(event.target.value);
  };

  const consultasFiltradas = consultas.filter((consulta) => {
    return (
      (!filtroData || consulta.data === filtroData) &&
      (!filtroStatus || consulta.status === filtroStatus)
    );
  });

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
            {consultasFiltradas.map((consulta) => (
              <ContentLine
                key={consulta.id}
                paciente={consulta.paciente}
                fisioterapeuta={consulta.fisioterapeuta}
                dataHora={consulta.dataHora}
                status={consulta.status}
                observacoes={consulta.observacoes}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agenda;
