import { createContext, useState } from "react";

interface ThemeContextProps {
    theme: ITheme;
    toggleTheme: (theme: ITheme) => void;
}
type ITheme = "light" | "dark";

export const ThemeContext = createContext({} as ThemeContextProps);

export const CustomThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<ITheme>("light");

    const toggleTheme = (theme: ITheme) => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
