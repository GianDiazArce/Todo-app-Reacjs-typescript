import React from "react";
import styled from "styled-components";

const CheckBox = styled.input`
    width: 1.5em;
    height: 1.5em;
    background-color: ${(props) => props.theme.bgCards};
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid ${(props) => props.theme.borderColor};
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    background-repeat: no-repeat;
    background-position: center;
    margin: 10px 14px;

    &:checked {
        background-image: url("./assets/images/icon-check.svg"),
            linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%));
        /* background-color: #ccc; */
    }
`;

interface Props {
    disabled?: boolean;
    defaultChecked?: boolean;
    type?: React.HTMLInputTypeAttribute | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    style?: React.CSSProperties | undefined;
}

export const CustomCheckBox = ({
    disabled = false,
    defaultChecked,
    type,
    onChange,
    style,
}: Props) => {
    return (
        <CheckBox
            onChange={onChange}
            type={type}
            defaultChecked={defaultChecked}
            disabled={disabled}
            style={style}
        />
    );
};
