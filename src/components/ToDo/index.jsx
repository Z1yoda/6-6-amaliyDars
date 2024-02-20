import { useEffect, useState } from "react";
import Header from "../Header";
import Form from "../Form";
import ToDoItem from "../ToDoItem";
import getData from "../utils/functions.js";
import "./index.css";

function Todo() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        setTodos(getData());
    }, []);

    function handleDelete(id) {
        let todosDel = todos.filter((todo) => {
            return todo.id != id;
        });

        setTodos(todosDel);
        localStorage.setItem("todos", JSON.stringify(todosDel));
    }

    function handleCheck(status, id) {
        let todosList = todos.map((todo) => {
            if (todo.id === id) {
                todo.status = status ? "checked" : "unchecked";
            }
            return todo;
        });
        setTodos(todosList);
        localStorage.setItem("todos", JSON.stringify(todosList));
    }

    return (
        <div className="todo-wrapper">
            <Header />
            <div className="form-todo-wrapper">
                <Form changeState={setTodos} />
                {todos.map((todo, index) => {
                    return (
                        <ToDoItem
                            check={handleCheck}
                            deleteTodo={handleDelete}
                            index={index + 1}
                            key={index}
                            data={todo}
                            todos={todos}  // pass the todos array
                            setTodos={setTodos}  // pass the setTodos function

                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Todo;
