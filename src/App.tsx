import { HomePage } from "./pages/HomePage";
import { TodoProvider } from "./context/TodoContext";
import { CustomThemeProvider } from "./context/ThemeContext";

const App = () => {
    return (
        <CustomThemeProvider>
            <TodoProvider>
                <HomePage />
            </TodoProvider>
        </CustomThemeProvider>
    );
};

export default App;
