import { Layout } from 'antd';
const { Content } = Layout;

import { MainContentContainer } from './style.jsx'

import PagesRouter from 'components/MainPage/PagesRouter';

const MainContent = ({ colorBgContainer }) => {
    return (
        <MainContentContainer data-color-bg-container={colorBgContainer}>
            <PagesRouter />
        </MainContentContainer>
    );
}

export default MainContent;