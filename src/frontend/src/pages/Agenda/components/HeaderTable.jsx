import React, { useState, useRef, useEffect } from "react";
import { PrimaryButton } from "./PrimaryButton";
import { IconChevronDown1 } from "../icons/IconChevronDown1";
import { IconChevronLeft } from "../icons/IconChevronLeft";
import { IconChevronRight } from "../icons/IconChevronRIght";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

export const HeaderTable = ({ updateFiltroData, setCheckFilterDate, checkFilterDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentUser = useSelector((state) => state.currentUser.value);
  const datePickerRef = useRef(null);

  useEffect(() => {
    updateFiltroData(currentDate);
  }, []);

  const nextDay = () => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    setCurrentDate(newDate);
    updateFiltroData(newDate);
  };

  const prevDay = () => {
    const newDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    setCurrentDate(newDate);
    updateFiltroData(newDate);
  };

  const formateDate = (date) => {
    return date.toLocaleDateString("pt-BR", { year: "numeric", month: "short", day: "numeric" });
  };

  const resetToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    updateFiltroData(today);
  };

  const handleCalendarClick = () => {
    datePickerRef.current.setOpen(true);
  };

  return (
    <div className="relative w-full h-[44px]">
      <div className="flex justify-between items-center px-4">
        <div className="text-[32px] font-semibold [font-family:'Inter',Helvetica]">
          Consultas
        </div>
        <div className="flex items-center gap-[24px]">
          <div className="flex items-center gap-[10px]">
            <label htmlFor="checkFilterDate">Habilitar filtro por data</label>
            <input
              className="w-[20px] h-[20px]"
              type="checkbox"
              id="checkFilterDate"
              name="checkFilterDate"
              checked={checkFilterDate}
              onChange={(e) => setCheckFilterDate(e.target.checked)}
            />
          </div>
          {/* <div> */}
          <div className="flex items-center gap-[4px] p-[8px] rounded-[36px] border-[0.7px] border-solid border-gray-400 cursor-pointer" onClick={prevDay}>
            <IconChevronLeft className="w-[20px] h-[20px]" />
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="text-gray-900 font-semibold [font-family:'Inter',Helvetica] text-[14px]">
              {formateDate(currentDate)}
            </div>
            <div className="text-[#585e6a] font-normal [font-family:'Inter',Helvetica] text-[14px] cursor-pointer" onClick={resetToToday}>
              Hoje
            </div>
            <div onClick={handleCalendarClick} className="cursor-pointer">
              <IconChevronDown1 className="w-[20px] h-[20px]" />
            </div>
            <DatePicker
              disabled={false}
              ref={datePickerRef}
              selected={currentDate}
              onChange={(date) => {
                setCurrentDate(date);
                updateFiltroData(date);
              }}
              onClickOutside={() => datePickerRef.current.setOpen(false)}
              withPortal
              shouldCloseOnSelect={true}
              showPopperArrow={false}
              className="hidden"
            />

            <div className="flex items-center gap-[4px] p-[8px] rounded-[36px] border-[0.7px] border-solid border-gray-400 cursor-pointer" onClick={nextDay}>
              <IconChevronRight className="w-[20px] h-[20px]" />
            </div>
          </div>
          {currentUser.user.role === "paciente" &&
            <PrimaryButton stateProp="default" />
          }

        </div>
      </div>
    </div>
  );
};
