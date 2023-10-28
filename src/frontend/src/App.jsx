// App.js
import React, { useState } from 'react';
import { Layout, theme } from 'antd';

import SideBar from 'components/MainPage/SideBar';
import MainContent from 'components/MainPage/MainContent';
import PageHeader from 'components/MainPage/PageHeader';

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div >
            <Layout hasSider >
                <SideBar collapsed={collapsed} />
                <Layout className="site-layout" style={{
                    minHeight: '100vh',
                    marginLeft: collapsed ? 80 : 200,
                    transition: 'ease-in-out .2s'
                }}>
                    <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} colorBgContainer={colorBgContainer} />
                    <MainContent colorBgContainer={colorBgContainer} />
                </Layout>
            </Layout>
        </div>
    );
};

export default App;