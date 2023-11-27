import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Layout, theme } from 'antd';
import './index.css';

import SideBar from 'components/MainPage/SideBar';
import MainContent from 'components/MainPage/MainContent';
import PageHeader from 'components/MainPage/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { setCurrentUser } from 'store/currentUser';

import { RightSideContainer } from 'style.jsx';

const checkSession = async () => {
    let storedToken = localStorage.getItem('token');
    let userData = null;

    if (storedToken) {
        storedToken = JSON.parse(storedToken);

        const decoded = jwtDecode(storedToken);

        const apiRoute = `${import.meta.env.VITE_API_BASE_ROUTE_SPRING}/auth/credentials/${decoded.id}`;
        const userEmail = decoded.email;
        try {
            const response = await axios.post(apiRoute, { email: userEmail},{
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                    'Access-Control-Allow-Origin': '*',
                },
            });
            userData = response.data;
            // console.info("Token validado: ", userData)
        } catch (error) {
            // console.error('Token expirado ou inválido', error);
        }
    }
    return userData;
};

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser.value);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const performSessionCheck = async () => {
        if (
            currentUser === null ||
            currentUser === undefined ||
            currentUser.user === null ||
            currentUser.user === undefined
        ) {
            const userData = await checkSession();

            if (userData === null) {
                const currentPath = window.location.pathname;
                if (currentPath !== '/login' && currentPath !== '/signup') {
                    // console.info('Usuário não logado, redirecionando para a página de login')
                    navigate('/login');
                }
                return
            }

            dispatch(setCurrentUser(userData));
        }
    };

    useEffect(() => {
        performSessionCheck();
    }, [currentUser, navigate]);

    return (
        <div >
            <Layout hasSider >
                <SideBar collapsed={collapsed} />
                <RightSideContainer className="site-layout" collapsed={collapsed}>
                    <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />
                    <MainContent colorBgContainer={colorBgContainer} />
                </RightSideContainer>
            </Layout>
        </div>
    );
};

export default App;