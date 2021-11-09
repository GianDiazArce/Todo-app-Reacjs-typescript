import { useContext, useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { TodoContext, ITodoItem } from "../../context/TodoContext";
import { CustomCheckBox } from "../custom/CustomCheckBox";
import { CustomFilterButtons } from "../custom/CustomFilterButtons";

const Container = styled.div`
    width: 100%;
    height: auto;
    background-color: ${(props) => props.theme.bgCards};
    border-radius: 5px;
    box-shadow: 0px 0px 10px -4px rgba(0, 0, 0, 0.5);
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 15px;
    position: relative;
    color: ${(props) => props.theme.todoCompleteText};

    @media screen and (max-width: 500px) {
        padding: 8px 10px;
    }
`;

const TotalItems = styled.span`
    font-size: 12px;
`;

const Paragraph = styled.p`
    font-size: 12px;
    cursor: pointer;

    &:hover {
        color: ${(props) => props.theme.text};
    }
`;

const CardTodoLists = styled.div`
    padding-bottom: 6px;
`;

const CardVoidList = styled.h3`
    padding: 20px;
    display: block;
    margin: 0 auto;
    text-align: center;
    font-weight: normal;
    font-size: 1.1em;
    letter-spacing: 0.5px;
`;

const TodoList = styled(DragDropContext)``;

const TodoListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 5px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};

    &:hover {
        img {
            display: flex;
        }
    }
`;

const TodoListItemText = styled.h3`
    color: ${(props) => props.theme.todoActiveText};

    @media (max-width: 500px) {
        font-size: 1em;
    }
`;

const DeleteIcon = styled.img`
    cursor: pointer;
    width: 0.9em;
    height: 0.9em;
    margin-left: auto;
    margin-right: 1em;
    display: none;
`;

const reorder = (list: ITodoItem[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const CardBody = () => {
    const {
        todoItems,
        countActiveTask,
        toggleStatusItem,
        deleteTaskCompleted,
        setTodoItems,
        deleteTaskById,
    } = useContext(TodoContext);
    const [filter, setFilter] = useState<"All" | "Active" | "Complete">("All");

    const [items, setItems] = useState<ITodoItem[]>(todoItems);

    useEffect(() => {
        setItems(todoItems);
    }, [todoItems]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        if (result.destination.index === result.source.index) return;

        const quotes: ITodoItem[] = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(quotes); //TODO: Solucionar esto
        setTodoItems(quotes);
    };

    const handleDeleteTask = (id: string) => {
        deleteTaskById(id);
    };

    const QuoteList = () => (
        <>
            {filter === "All"
                ? items.map((todoItem: ITodoItem, index: number) => (
                      <Draggable
                          key={todoItem.id}
                          draggableId={todoItem.id}
                          index={index}
                      >
                          {(provided, snapshot) => (
                              <TodoListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                              >
                                  <CustomCheckBox
                                      defaultChecked={todoItem.status}
                                      type="checkbox"
                                      onChange={(e) =>
                                          toggleStatusItem(todoItem)
                                      }
                                  />
                                  <TodoListItemText
                                      style={{
                                          textDecoration:
                                              todoItem.status === true
                                                  ? "line-through"
                                                  : "none",
                                          opacity:
                                              todoItem.status === true
                                                  ? 0.6
                                                  : 1,
                                      }}
                                  >
                                      {todoItem.text}
                                  </TodoListItemText>

                                  <DeleteIcon
                                      onClick={(e) =>
                                          handleDeleteTask(todoItem.id)
                                      }
                                      src={"./assets/images/icon-cross.svg"}
                                  />
                              </TodoListItem>
                          )}
                      </Draggable>
                  ))
                : items
                      .filter(
                          (todoItem) =>
                              todoItem.status ===
                              (filter === "Active"
                                  ? false
                                  : filter === "Complete"
                                  ? true
                                  : null)
                      )
                      .map((todoItem, index) => (
                          <TodoListItem key={todoItem.id}>
                              <CustomCheckBox
                                  defaultChecked={todoItem.status}
                                  type="checkbox"
                                  onChange={(e) => toggleStatusItem(todoItem)}
                              />
                              <TodoListItemText
                                  style={{
                                      textDecoration:
                                          todoItem.status === true
                                              ? "line-through"
                                              : "none",
                                      opacity:
                                          todoItem.status === true ? 0.6 : 1,
                                  }}
                              >
                                  {todoItem.text}
                              </TodoListItemText>

                              <DeleteIcon
                                  onClick={(e) => handleDeleteTask(todoItem.id)}
                                  src={"./assets/images/icon-cross.svg"}
                              />
                          </TodoListItem>
                      ))}
        </>
    );

    return (
        <Container>
            <CardTodoLists>
                {todoItems.length === 0 ? (
                    <CardVoidList>Empty list...</CardVoidList>
                ) : (
                    <TodoList onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <QuoteList />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TodoList>
                )}
            </CardTodoLists>
            <CardFooter>
                <TotalItems>{countActiveTask()} items left</TotalItems>
                <CustomFilterButtons filter={filter} setFilter={setFilter} />
                <Paragraph onClick={deleteTaskCompleted}>
                    Clear Completed
                </Paragraph>
            </CardFooter>
        </Container>
    );
};
