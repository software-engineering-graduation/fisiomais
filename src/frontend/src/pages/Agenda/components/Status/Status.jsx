import React from "react";
import IconConfirmed from "../../icons/IconConfirmed/IconConfirmed"; 
import { IconCancelled } from "../../icons/IconCancelled/IconCancelled"; 
import { IconPending } from "../../icons/IconPending/IconPending";

export const Status = ({ status }) => {
    return (
      <div className="flex items-center w-[116px] h-[48px] pr-0 gap-[4px] flex-shrink-0">
        {status === "confirmado" && (
          <>
            <IconConfirmed className="w-6 h-6" />
            <span className="text-sm text-[#02A443]">Confirmado</span>
          </>
        )}
  
        {status === "cancelado" && (
          <>
            <IconCancelled className="w-6 h-6" />
            <span className="text-sm text-[#D0775B]">Cancelado</span>
          </>
        )}
  
        {status === "realizado" && (
          <>
            <IconConfirmed className="w-6 h-6" />
            <span className="text-sm text-[#00752f]">Realizado</span>
          </>
        )}
  
        {status === "pendente" && (
          <>
            <IconPending className="w-6 h-6" />
            <span className="text-sm text-[#00000066]">Pendente</span>
          </>
        )}
      </div>
    );
};
