import React, { useState } from 'react';
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdDone } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

function TodoLists() {
  const [todos, setTodos] = useState([
    { id: 1, name: "Todo 1", isEditMode:false },
    { id: 2, name: "Todo 2", isEditMode:false },
    { id: 3, name: "Todo 3", isEditMode:false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const orderedTodos = (id) => {
    const orderedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ordered: true };
      }
      return todo;
    });
    setTodos(orderedTodos);
  };

  const changedInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, { id: Math.random(), name: inputValue }]);
    }
    setInputValue("");
  };

  const editMode = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isEditMode: true };
      }
      return todo;
    });
    setTodos(newTodos); 
  };

  const editContentInput = (id) => {
    if(editValue.trim()){
        const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: editValue, isEditMode: false };
      }
      return todo; 
    });
    setTodos(newTodos);
    }
};
const deleteAll = () => {
    setTodos([]);
}

  return (
    <div className='todos-content'>
        <h1>Todo list</h1>
        <ul>
            {todos.length ? todos.map((todo) => (
            <li className={todo.ordered ? "ordered" : ""} key={todo.id}>
                <span onInput={(e) => setEditValue(e.target.innerText)} className={todo.isEditMode ? "editable" : ""} contentEditable={todo.isEditMode}>{todo.name}</span>
                <div>
                <button onClick={() => editContentInput(todo.id)} className={todo.isEditMode ? "" : "none"}><IoSaveOutline /></button>
                <button className={todo.isEditMode ? "none" : ""} onClick={() => editMode(todo.id)}><CiEdit /></button>
                <button onClick={() => orderedTodos(todo.id)}><MdDone /></button>
                <button onClick={() => deleteTodo(todo.id)}><RiDeleteBin6Line /></button>
                </div>
            </li>
            )) : 'There is no todos'}
            
        </ul>
        <form onSubmit={(e) => addTodo(e)}>
            <input type="text" onChange={changedInputValue} value={inputValue} placeholder="Enter a name for this …"/>
            <button type="submit"><GoPlus /></button>
        </form>
        <button className='delete-all'onClick={deleteAll}>Delete all</button>
    </div>
  );
}

export default TodoLists;