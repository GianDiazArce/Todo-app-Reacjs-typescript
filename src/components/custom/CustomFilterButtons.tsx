import styled from "styled-components";
import { lightTheme } from "../../theme/config";

const FilterButtons = styled.ul`
    display: flex;

    font-size: 12px;
    gap: 1.2em;

    @media screen and (max-width: 768px) {
        gap: 5px;
    }

    @media (max-width: 500px) {
        position: absolute;
        bottom: -70px;
        left: 0;
        align-items: center;
        justify-content: center;
        width: 100%;
        font-size: 1em;
        gap: 40px;
        background-color: ${(props) => props.theme.bgCards};
        box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        padding: 15px 0;
    }
`;

const FilterButton = styled.li`
    list-style: none;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.text} !important;
    }
`;

interface Props {
    filter: "All" | "Active" | "Complete";
    setFilter: React.Dispatch<
        React.SetStateAction<"All" | "Active" | "Complete">
    >;
}

export const CustomFilterButtons = ({ filter, setFilter }: Props) => {
    return (
        <FilterButtons>
            <FilterButton
                style={{
                    color: filter === "All" ? lightTheme.text : "inherit",
                }}
                onClick={() => setFilter("All")}
            >
                All
            </FilterButton>
            <FilterButton
                style={{
                    color: filter === "Active" ? lightTheme.text : "inherit",
                }}
                onClick={() => setFilter("Active")}
            >
                Active
            </FilterButton>
            <FilterButton
                style={{
                    color: filter === "Complete" ? lightTheme.text : "inherit",
                }}
                onClick={() => setFilter("Complete")}
            >
                Completed
            </FilterButton>
        </FilterButtons>
    );
};
