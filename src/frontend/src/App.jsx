// App.js
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Button, theme, ConfigProvider } from 'antd';

import SideBar from './components/SideBar';

const { Header, Sider, Content } = Layout;

import Home from './pages/Home';
import Midias from './pages/Midias';
import Agenda from './pages/Agenda';
import Exercicios from './pages/Exercicios';
import Historico from './pages/Historico';
import Pacientes from './pages/Pacientes';

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const currentPage = useSelector(state => state.currentPage.value)

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                    },
                    components: {
                        Layout: {
                        }
                    }
                }}
            >
                <div style={{ height: '100vh' }}> {/* Set the container to 100vh */}
                    <Layout style={{ height: '100%' }}>
                        <SideBar collapsed={collapsed} />
                        <Layout>
                            <Header
                                style={{
                                    padding: 0,
                                    background: colorBgContainer,
                                }}
                            >
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: '16px',
                                        width: 64,
                                        height: 64,
                                    }}
                                />
                            </Header>
                            <Content
                                style={{
                                    margin: '24px 16px',
                                    padding: 24,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                }}
                            >
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/midias" element={<Midias />} />
                                    <Route path="/agenda" element={<Agenda />} />
                                    <Route path="/exercicios" element={<Exercicios />} />
                                    <Route path="/historico" element={<Historico />} />
                                    <Route path="/pacientes" element={<Pacientes />} />
                                </Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </ConfigProvider>
        </>
    );
};

export default App;