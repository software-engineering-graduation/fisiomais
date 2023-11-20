import React from "react";
import { HeaderItem } from "./HeaderItem/HeaderItem";

export const TableTop = () => {
  return (
    <div className="w-full bg-grey-200">
      <div className="flex justify-between items-center px-4" style={{ height: '48px' }}>
        <div className="flex-1 text-left px-4">Paciente</div>
        <div className="flex-1 text-left px-4">Fisioterapeuta</div>
        <div className="flex-1 text-left px-4">Data e Hora Consulta</div>
        <div className="flex-1 text-left px-4">Status</div>
        <div className="flex-1 text-left px-4">Observações</div>
      </div>
    </div>
  );
};
