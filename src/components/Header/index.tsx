import React from 'react'
import styled from "styled-components";

const Header = styled.header`
    background-image: ${props => props.theme.bgImg};
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 40vh;
`;


export const HeaderComponent = () => {
    return (
        <Header>
            
        </Header>
    )
}
