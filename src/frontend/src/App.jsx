import React, { useEffect, useState } from 'react';
import { Layout, theme } from 'antd';
import './index.css';

import SideBar from 'components/MainPage/SideBar';
import MainContent from 'components/MainPage/MainContent';
import PageHeader from 'components/MainPage/PageHeader';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { RightSideContainer } from 'style.jsx';

const App = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser.value);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (!currentUser.user) {
            const currentPath = window.location.pathname;
            if (currentPath !== '/login' && currentPath !== '/signup') {
                console.info('Usuário não logado, redirecionando para a página de login')
                navigate('/login');
            }
        }
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