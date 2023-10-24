import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { Menu, Layout } from 'antd';

import FisiomaisLogo from '../../assets/images/logo_stroke_white.svg';
import SideMenuItens from '../../data/menu_itens';
import {setPage} from '../../store/currentPage'

const Sider = Layout.Sider;

const SideBar = ({ collapsed }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleButtonClick = (path, key) => {
        dispatch(setPage(key))
        navigate(path);
    };

    const menuItems = SideMenuItens.map((item) => {
        return (
            {
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => handleButtonClick(item.route, item.key),
            }
        );
    });

    return (
        <Sider
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
                    src={FisiomaisLogo}
                    alt="Fisiomais logo"
                    style={{
                        width: collapsed ? 50 : 100,
                        margin: '16px 0',
                        transition: 'all 0.2s',
                    }}
                />
            </div>

            <Menu
                mode="inline"
                defaultSelectedKeys={[0]}
                items={menuItems}
            />
        </Sider>
    )
};

export default SideBar;
