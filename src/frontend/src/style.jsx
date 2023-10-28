import styled from 'styled-components';

export const RightSideContainer = styled.div.withConfig({ shouldForwardProp: (prop, defaultValidatorFn) => !['collapsed'].includes(prop) })`
    min-height: 100vh;
    margin-left: ${props => (props.collapsed ? '80px' : '200px')};
    transition: ease-in-out .2s;
`