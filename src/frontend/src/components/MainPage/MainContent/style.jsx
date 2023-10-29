import styled from 'styled-components';

export const MainContentContainer = styled.div`
    margin: 24px 16px;
    // height: 100%;
    border-radius: 8px;
    padding: 24px;
    background: ${props => props['data-color-bg-container']};
    overflow: initial;
`;

MainContentContainer.defaultProps = {
    'data-color-bg-container': '#e0e0e0',
}