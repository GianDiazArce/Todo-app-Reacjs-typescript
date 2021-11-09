import React, { useContext, useState } from "react";
import styled from "styled-components";
import { TodoContext } from "../../context/TodoContext";
import { ThemeContext } from "../../context/ThemeContext";
import { CustomCheckBox } from "../custom/CustomCheckBox";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const CardTexts = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardTitle = styled.h1`
    letter-spacing: 10px;
    margin: 5px 0;
    color: #fff;
`;

const ThemeButton = styled.img`
    cursor: pointer;
`;

const CardInput = styled.form`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    background-color: ${(props) => props.theme.bgCards};
    border-radius: 4px;
    padding: 8px 10px;

    box-shadow: 0px 0px 10px -4px rgba(0, 0, 0, 0.5);
`;

const Text = styled.input`
    background-color: transparent;
    border: none;
    padding: 8px 5px;
    width: 80%;
    color: ${(props) => props.theme.todoActiveText};
    border-bottom: 1.4px solid ${(props) => props.theme.borderColor};
    &:focus {
        outline: none;
        border-bottom-color: ${(props) => props.theme.borderColor};
    }
    &:hover {
        border-bottom-color: ${(props) => props.theme.borderColor};
    }
`;

const AddButton = styled.button`
    display: none;
`;

export const CardHeader = () => {
    const [text, setText] = useState("");
    const { newTodoItem } = useContext(TodoContext);
    const { toggleTheme, theme } = useContext(ThemeContext);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const enterPressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newTodoItem(text);
        setText("");
    };

    return (
        <Container>
            <CardTexts>
                <CardTitle>TODO</CardTitle>
                {theme === "light" ? (
                    <ThemeButton
                        src={`./assets/images/icon-moon.svg`}
                        onClick={() => toggleTheme(theme)}
                    />
                ) : (
                    <ThemeButton
                        src={`./assets/images/icon-sun.svg`}
                        onClick={() => toggleTheme(theme)}
                    />
                )}
            </CardTexts>
            <CardInput onSubmit={(e) => enterPressSubmit(e)}>
                <CustomCheckBox style={{ marginLeft: "8px" }} disabled={true} />
                <Text
                    autoComplete={"off"}
                    type="text"
                    placeholder="Create a new todo..."
                    name="todoText"
                    value={text}
                    onChange={(e) => {
                        handleTextChange(e);
                    }}
                />
                <AddButton disabled={text.length === 0} type="submit" />
            </CardInput>
        </Container>
    );
};
