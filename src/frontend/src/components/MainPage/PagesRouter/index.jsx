import { Routes, Route } from 'react-router-dom';

import Midias from 'pages/Midias';
import Agenda from 'pages/Agenda';
import Exercicios from 'pages/Exercicios';
import Historico from 'pages/Historico';
import Pacientes from 'pages/Pacientes';
import MidiaDetail from 'pages/Midias/MidiaDetail';
import NewMidia from 'pages/Midias/NewMidia';
import Cadastro from 'pages/Cadastro';
import NovoTratamento from 'pages/Tratamento/NovoTratamento';
import CadastroFisioterapeuta from 'pages/Fisioterapeuta';
import AcompanhamentoVirtual from 'pages/Acompanhar';
import Consulta from 'pages/Consulta';
import DadosConsulta from 'pages/Consulta/DadosConsulta';
import Login from 'pages/Login';
import Indicadores from 'pages/Indicadores';
import FisioterapeutaSignup from 'pages/SignUp/FisioterapeutaSignUp';
import PacienteSignup from 'pages/SignUp/PacienteSignUp';
import Tratamento from 'pages/Tratamento';
import TratamentoDetail from 'pages/Tratamento/TratamentoDetail';
import ExercicioDetail from 'pages/Exercicios/ExercicioDetail';
import NewExercicio from 'pages/Exercicios/NewExercicio';
import EditarDadosConsulta from 'pages/Consulta/EditarDadosConsulta';
import Disponibilidade from 'pages/Disponibilidade';

const PagesRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Agenda />} />
            <Route path="/midias" element={<Midias />} />
            <Route path="/midia/:id" element={<MidiaDetail />} />
            <Route path="/midia/criar" element={<NewMidia />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/exercicio" element={<Exercicios />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/tratamento/novo" element={<NovoTratamento />} />
            <Route path="/fisioterapeuta" element={<CadastroFisioterapeuta />} />
            <Route path="/acompanhamento" element={<AcompanhamentoVirtual />} />
            <Route path="/nova-consulta" element={<Consulta />} />
            <Route path='/nova-consulta/dados' element={<DadosConsulta />} />
            <Route path="/signup/fisioterapeuta" element={<FisioterapeutaSignup />} />
            <Route path="/signup/paciente" element={<PacienteSignup />} />
            <Route path='/indicadores' element={<Indicadores />} />
            <Route path='/tratamento' element={<Tratamento />} />
            <Route path='/tratamento/:id' element={<TratamentoDetail />} />
            <Route path='/exercicio/:id' element={<ExercicioDetail />} />
            <Route path='/exercicio/criar' element={<NewExercicio />} />
            <Route path='/consulta/editar/:id' element={<EditarDadosConsulta />} />
            <Route path='/disponibilidade' element={<Disponibilidade />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}

export default PagesRouter;