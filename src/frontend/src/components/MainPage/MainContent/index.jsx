import { Layout } from 'antd';
const { Content } = Layout;

import PagesRouter from 'components/MainPage/PagesRouter';

const MainContent = ({ colorBgContainer }) => {
    return (

        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                background: colorBgContainer,
                overflow: 'initial',
            }}
        >

            <PagesRouter />
        </Content>
    );
}

export default MainContent;