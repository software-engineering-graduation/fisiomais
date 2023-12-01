import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Menu, Layout, notification } from 'antd';


import FisiomaisLogo from 'assets/images/logo_stroke_white.svg';
import SideMenuItensFisio, { SideMenuItensAdmin, SideMenuItensPaciente } from './data/menu_itens';
import { setPage } from 'store/currentPage'
import { setLoginStatus } from 'store/currentUser'

const { Sider } = Layout;

const SideBar = ({ collapsed }) => {
    const [defaultSelectedKey, setDefaultSelectedKey] = useState('0')
    const currentUser = useSelector(state => state.currentUser.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { status } = currentUser;
    const [api, contextHolder] = notification.useNotification();

    let menu = currentUser.user?.role === 'fisioterapeuta' ?
        SideMenuItensFisio : currentUser.user?.role === 'paciente' ?
        SideMenuItensPaciente : currentUser.user?.role === 'admin' ?
        SideMenuItensAdmin.concat(SideMenuItensFisio, SideMenuItensPaciente).filter((item, index, self) =>
            index === self.findIndex((t) => (
                t.key === item.key
            ))
        ) : []

    menu = menu.sort((a, b) => {
        if (a.label > b.label) {
            return 1;
        }
        if (a.label < b.label) {
            return -1;
        }
        return 0;
    })

    useEffect(() => {
        if (currentUser === null || currentUser === undefined || currentUser.user === null || currentUser.user === undefined) {
            return
        }
        updateMenuSelection();

        const openNotification = (type, title, description) => {
            api[type]({
                message: title,
                description: description,
                duration: 3,
                placement: 'bottomRight',
            });
        };

        if (status === 'succeeded') {
            openNotification('success',
                `Login realizado com sucesso`,
                `Bem-vindo(a), ${currentUser.user.nome}!`
            )

            dispatch(setLoginStatus('idle'))
        }
    }, [currentUser, api, status]);

    const updateMenuSelection = () => {
        const currentPage = window.location.pathname
        let currentPageKey = 0;
        try {
            currentPageKey = menu.find(item => currentPage.includes(item.route)).key;
        } catch (error) {
            currentPageKey = 0;
        }
        setDefaultSelectedKey(currentPageKey.toString());
    }

    const handleButtonClick = (path, key) => {
        dispatch(setPage(key))
        navigate(path);
        updateMenuSelection()
    };

    const menuItems = menu.map((item) => {
        return (
            {
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => handleButtonClick(item.route, item.key),
            }
        );
    });

    const handleHomeButtonClick = () => {
        if (window.location.pathname !== '/') {
            handleButtonClick('/', 0)
        }
    }

    if (
        currentUser === null ||
        currentUser === undefined ||
        currentUser.user === null ||
        currentUser.user === undefined
    ) {
        return null
    }

    return (
        <>
            {contextHolder}
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                trigger={null}
                collapsible collapsed={collapsed}
                theme="light"
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <img
                        onClick={() => handleHomeButtonClick()}
                        src={FisiomaisLogo}
                        alt="Fisiomais logo"
                        style={{
                            width: collapsed ? 50 : 100,
                            margin: '16px 0',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                        }}
                    />
                </div>

                <Menu
                    mode="inline"
                    items={menuItems}
                    selectedKeys={[defaultSelectedKey]}
                />
            </Sider>
        </>
    )
};

export default SideBar;
