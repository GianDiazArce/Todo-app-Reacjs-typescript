import { useContext } from "react";
import { HeaderComponent } from "../components/Header";
import { lightTheme, darkTheme } from "../theme/config";
import { CardComponent } from "../components/Card";
import { ThemeProvider } from "styled-components";
import { ThemeContext } from "../context/ThemeContext";
import styled from "styled-components";

const themes = {
    light: lightTheme,
    dark: darkTheme,
};

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: ${(props) => props.theme.background};
`;

export const HomePage = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={themes[theme]}>
            <Container>
                <HeaderComponent />
                <CardComponent />
            </Container>
            <div className="attribution">
                Challenge by{" "}
                <a
                    href="https://www.frontendmentor.io?ref=challenge"
                    rel="noreferrer"
                    target="_blank"
                >
                    Frontend Mentor
                </a>
                . Coded by{" "}
                <a href="https://www.frontendmentor.io/profile/GianDiazArce">
                    GianDiazArce
                </a>
                .
            </div>
        </ThemeProvider>
    );
};
