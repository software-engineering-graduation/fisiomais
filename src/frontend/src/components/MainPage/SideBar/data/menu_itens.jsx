import React from 'react';
import {
    FileImageOutlined
} from '@ant-design/icons';

import { GrSchedule, GrScheduleNew } from 'react-icons/gr'
import { MdPeopleOutline } from 'react-icons/md'
import { AiOutlineBarChart } from 'react-icons/ai'
import { MdHealing } from 'react-icons/md'
import { MdOutlineSportsGymnastics } from "react-icons/md";

const CommomItens = [
    {
        key: 1,
        icon: <GrSchedule />,
        label: 'Consultas',
        route: 'agenda',
    },
    {
        key: 2,
        icon: <MdHealing />,
        label: 'Tratamentos',
        route: 'tratamento',
    }
]

const SideMenuItensFisio = [
    ...CommomItens,
    {
        key: 3,
        icon: <FileImageOutlined />,
        label: 'Mídias',
        route: 'midias',
    },
    {
        key: 4,
        icon: <MdPeopleOutline />,
        label: 'Acompanhamento',
        route: 'acompanhamento',
    },
    {
        key: 5,
        icon: <MdOutlineSportsGymnastics />,
        label: 'Exercícios',
        route: 'exercicio',
    },
    {
        key: 7,
        icon: <GrScheduleNew />,
        label: 'Disponibilidade',
        route: 'disponibilidade',
    }
]

export const SideMenuItensPaciente = [
    ...CommomItens
]

export const SideMenuItensAdmin = [
    {
        key: 6,
        icon: <AiOutlineBarChart />,
        label: 'Indicadores',
        route: 'indicadores',
    },
]

export default SideMenuItensFisio;