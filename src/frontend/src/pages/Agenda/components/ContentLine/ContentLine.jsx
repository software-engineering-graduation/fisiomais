import React, { useState } from "react";
import { Status } from "../../components/Status/Status";
import { IconMore } from "../../icons/IconMore";
import { IconDelete } from "../../icons/IconDelete";
import { IconEdit } from "../../icons/IconEdit";

export const ContentLine = ({ paciente, fisioterapeuta, dataHora, status, observacoes }) => {
  const [showIcons, setShowIcons] = useState(false);

  return (
    <div className="flex items-center justify-between border-t border-b border-[rgba(220,223,227,0.50)]">
      <div className="flex-1 px-4 text-left">{paciente}</div>
      <div className="flex-1 px-4 text-left">{fisioterapeuta}</div>
      <div className="flex-1 px-4 text-left">{dataHora}</div>
      <div className="flex-1 px-4 text-left">
        <Status status={status} />
      </div>
      <div className="flex-1 px-4 text-left">{observacoes}</div>
      <div className="relative" onMouseEnter={() => setShowIcons(true)} onMouseLeave={() => setShowIcons(false)}>
        <div className="flex items-center">
          {showIcons && (
            <>
              <IconEdit />
              <IconDelete />
            </>
          )}
          <IconMore className="ml-2" />
        </div>
      </div>
    </div>
  );
};
