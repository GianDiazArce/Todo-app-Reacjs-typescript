import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ITodoItem {
    id: string;
    text: string;
    status: boolean;
}

type TodoContextProps = {
    todoItems: ITodoItem[];
    newTodoItem: (text: string) => void;
    countActiveTask: () => number;
    toggleStatusItem: (todoItem: ITodoItem) => void;
    deleteTaskCompleted: () => void;
    setTodoItems: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
    deleteTaskById: (taskId: string) => void;
};

const initialState: ITodoItem[] = [
    {
        id: "1",
        text: "Complete online JavaScript course",
        status: true,
    },
    {
        id: "2",
        text: "Jog around the park 3x",
        status: false,
    },
    {
        id: "3",
        text: "10 minutes meditation",
        status: false,
    },
    {
        id: "4",
        text: "Read for 1 hour",
        status: false,
    },
    {
        id: "5",
        text: "Pick up groceries",
        status: false,
    },
    {
        id: "6",
        text: "Complete Todo App on Frontend Mentor",
        status: false,
    },
];

export const TodoContext = createContext({} as TodoContextProps);

export const TodoProvider = ({ children }: any) => {
    const [todoItems, setTodoItems] = useState<ITodoItem[]>(initialState);

    const newTodoItem = (text: string) => {
        setTodoItems([
            ...todoItems,
            {
                id: uuidv4(),
                text,
                status: false,
            },
        ]);
    };

    const toggleStatusItem = (todoItem: ITodoItem) => {
        const itemFound = todoItems.find((item) => item.id === todoItem.id);
        if (itemFound) {
            setTodoItems(
                todoItems.map((item) =>
                    item.id === todoItem.id
                        ? { ...item, status: !itemFound.status }
                        : item
                )
            );
        }
    };

    const countActiveTask = () => {
        const items = todoItems.filter((item) => item.status === false);
        return items.length;
    };

    const deleteTaskCompleted = () => {
        setTodoItems(todoItems.filter((item) => item.status !== true));
    };

    const deleteTaskById = (taskId: string) => {
        setTodoItems(todoItems.filter((item) => item.id !== taskId));
    };

    return (
        <TodoContext.Provider
            value={{
                todoItems,
                newTodoItem,
                toggleStatusItem,
                countActiveTask,
                deleteTaskCompleted,
                setTodoItems,
                deleteTaskById,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};
