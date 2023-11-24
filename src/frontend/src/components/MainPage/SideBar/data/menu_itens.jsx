import React from 'react';
import {
    FileImageOutlined
} from '@ant-design/icons';

import { CiMedicalClipboard } from 'react-icons/ci'
import { GrSchedule } from 'react-icons/gr'
import { MdPeopleOutline } from 'react-icons/md'
import { AiOutlineBarChart } from 'react-icons/ai'
import { LiaHistorySolid } from 'react-icons/lia'
import { AiOutlineHome } from 'react-icons/ai'

const SideMenuItens = [
    {
        key: 1,
        icon: <FileImageOutlined />,
        label: 'Mídias',
        route: 'midias',
    },
    {
        key: 3,
        icon: <GrSchedule />,
        label: 'Agenda',
        route: 'agenda',
    },
    {
        key: 6,
        icon: <MdPeopleOutline />,
        label: 'Cadastro Fisioterapeuta',
        route: 'fisioterapeuta',
    },
    {
        key: 7, 
        icon: <MdPeopleOutline />,
        label: 'Acompanhamento',
        route: 'acompanhamento',
    }
]

export const SideMenuItensAdmin = [
    {
        key: 8,
        icon: <AiOutlineBarChart />,
        label: 'Indicadores',
        route: 'indicadores',
    },
]

export default SideMenuItens;