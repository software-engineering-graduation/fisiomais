import React from "react";
import { Route, Routes } from "react-router-dom";

import Midias from "./pages/Midias/index";
import MidiaDetail from "./pages/Midias/MidiaDetail";
import Agenda from "./pages/Agenda";
import Exercicios from "./pages/Exercicios";
import Historico from "./pages/Historico";
import Pacientes from "./pages/Pacientes";
import NewMidia from "./pages/Midias/NewMidia";
import Cadastro from "./pages/Cadastro";
import NovoTratamento from "./pages/Tratamento/NovoTratamento";
import CadastroFisioterapeuta from "./pages/Fisioterapeuta";
import AcompanhamentoVirtual from "pages/Acompanhar";
import Consulta from "pages/Consulta";
import DadosConsulta from 'pages/Consulta/DadosConsulta';
import Login from "pages/Login";
import FisioterapeutaSignup from './pages/Signup/FisioterapeutaSignup';
import PacienteSignup from './pages/Signup/PacienteSignup';
import Tratamento from "pages/Tratamento";
import TratamentoDetail from "pages/Tratamento/TratamentoDetail";
import ExercicioDetail from 'pages/Exercicios/ExercicioDetail';
import NewExercicio from "pages/Exercicios/NewExercicio";
import EditarDadosConsulta from 'pages/Consulta/EditarDadosConsulta';
import Disponibilidade from 'pages/Disponibilidade';
import NewDisp from 'pages/Disponibilidade/NewDisp';

const Router = () => {
    return (
        <Routes>
            <Route component={Agenda} path="/" exact/>
            <Route component={Midias} path="/midias" />
            <Route component={MidiaDetail} path="/midia/:id" />
            <Route component={NewMidia} path="/midia/criar" />
            <Route component={Agenda} path="/agenda" />
            <Route component={Exercicios} path="/exercicio" />
            <Route component={Historico} path="/historico" />
            <Route component={Pacientes} path="/pacientes" />
            <Route component={Cadastro} path="/cadastro" />
            <Route component={NovoTratamento} path="/tratamento/novo" />
            <Route component={CadastroFisioterapeuta} path="/fisioterapeuta" />
            <Route component={AcompanhamentoVirtual} path="/acompanhamento" />
            <Route component={Consulta} path="/nova-consulta" />
            <Route component={DadosConsulta} path="/nova-consulta/dados" />
            <Route component={FisioterapeutaSignup} path="/signup/fisioterapeuta" />
            <Route component={PacienteSignup} path="/signup/paciente" />
            <Route component={Tratamento} path='/tratamento' />
            <Route component={TratamentoDetail} path='/tratamento/:id' />
            <Route component={ExercicioDetail} path='/exercicio/:id' />
            <Route component={NewExercicio} path='/exercicio/criar' />
            <Route component={EditarDadosConsulta} path='/consulta/editar/:id' />
            <Route component={Disponibilidade} path='/disponibilidade' />
            <Route component={NewDisp} path='/disponibilidade/criar' />
            <Route component={Login} path='/login' />
        </Routes>
    )
}

export default Router;