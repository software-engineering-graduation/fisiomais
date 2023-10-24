import React from 'react';
import {
    FileImageOutlined
} from '@ant-design/icons';

import { CiMedicalClipboard } from 'react-icons/ci'
import { GrSchedule } from 'react-icons/gr'
import { MdPeopleOutline } from 'react-icons/md'
import { LiaHistorySolid } from 'react-icons/lia'

const SideMenuItens = [
    {
        key: 1,
        icon: <FileImageOutlined />,
        label: 'Mídias',
        route: 'midias',
    },
    {
        key: 2,
        icon: <CiMedicalClipboard />,
        label: 'Exercicios',
        route: 'exercicios',
    },
    {
        key: 3,
        icon: <GrSchedule />,
        label: 'Agenda',
        route: 'agenda',
    },
    {
        key: 4,
        icon: <MdPeopleOutline />,
        label: 'Pacientes',
        route: 'pacientes',
    },
    {
        key: 5,
        icon: <LiaHistorySolid />,
        label: "Histórico",
        route: "historico",
    }
]

export default SideMenuItens;