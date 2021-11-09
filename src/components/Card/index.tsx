import React from "react";
import { CardHeader } from "./CardHeader";
import styled from "styled-components";
import { CardBody } from "./CardBody";

const Card = styled.main`
    position: relative;
    top: -30vh;
    width: 40%;
    margin: 0 auto;
    min-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    @media (max-width: 500px) {
        min-width: 90%;
        width: 90%;
    }
`;

export const CardComponent = () => {
    return (
        <Card>
            <CardHeader />
            <CardBody />
        </Card>
    );
};
