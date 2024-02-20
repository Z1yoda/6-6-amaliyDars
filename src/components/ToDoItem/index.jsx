import React, { useState } from 'react';
import './index.css';

function TodoItem({ data, index, deleteTodo, check, todos, setTodos }) {
    const { name, status, id } = data;
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const styleObj = { backgroundColor: index % 2 === 1 ? "lightGray" : "white" };

    function handleDelete(e) {
        e.preventDefault();
        const isDelete = window.confirm(`Rostdan ham ${name}ni ochirmoqchimisiz?`);
        if (isDelete) {
            deleteTodo(id);
        }
    }

    function handleChange(e) {
        check(e.target.checked, id);
    }

    function handleEdit() {
        setIsEditing(!isEditing);
    }

    function handleEditSubmit(e) {
        e.preventDefault();

        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, name: editedName };
            }
            return todo;
        });

        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setIsEditing(false);
    }

    return (
        <div className='item-wrapper' style={styleObj}>
            <div className='check-name'>
                {isEditing ? (
                    <input
                        className='editInput'
                        type='text'
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        autoFocus
                    />
                ) : (
                    <>
                        <input
                            type='checkbox'
                            name=''
                            id={'el_' + id}
                            onChange={handleChange}
                            checked={status === 'checked'}
                        />
                        <label
                            htmlFor={'el_' + id}
                            style={status === 'checked' ? { textDecoration: "line-through" } : {}}
                        >
                            {name}
                        </label>
                    </>
                )}
            </div>
            <div className='actions'>
                {isEditing ? (
                    <button className='saveButton' onClick={handleEditSubmit}>Save</button>
                ) : (
                    <i className='fa-regular fa-pen-to-square' onClick={handleEdit}></i>
                )}
                <i className='fa-regular fa-trash-can' onClick={handleDelete}></i>
            </div>
        </div>
    );
}

export default TodoItem;

