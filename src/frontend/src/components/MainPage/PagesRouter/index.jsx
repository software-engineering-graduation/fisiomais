import { Routes, Route } from 'react-router-dom';

import Home from 'pages/Home';
import Midias from 'pages/Midias';
import Agenda from 'pages/Agenda';
import Exercicios from 'pages/Exercicios';
import Historico from 'pages/Historico';
import Pacientes from 'pages/Pacientes';
import MidiaDetail from 'pages/Midias/MidiaDetail';
import NewMidia from 'pages/Midias/NewMidia';

const PagesRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/midias" element={<Midias />} />
            <Route path="/midia/:id" element={<MidiaDetail />} />
            <Route path="/midia/criar" element={<NewMidia />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/exercicios" element={<Exercicios />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/pacientes" element={<Pacientes />} />
        </Routes>
    );
}

export default PagesRouter;