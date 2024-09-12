import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleClick = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedArray = [...todos];
    updatedArray.push(newTodoItem);
    setTodos(updatedArray);
    localStorage.setItem("todolist", JSON.stringify(updatedArray));
  };

  const handleDelete = (index) => {
    let listItem = [...todos];
    listItem.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(listItem));
    setTodos(listItem);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let completedOn = `${dd}-${mm}-${yyyy} at  ${hr} : ${min} : ${sec}`;
    let filteredItem = {
      ...todos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompleteTodo = (index)=>{
    let listItem = [...completedTodos];
    listItem.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(listItem));
    setCompletedTodos (listItem);
  }
  
  useEffect(() => {
    let saveTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodos = JSON.parse(
      localStorage.getItem("completedTodos")
    );
    if (saveTodo) {
      setTodos(saveTodo);
    }
    if (savedCompletedTodos) {
      setCompletedTodos(savedCompletedTodos);
    }
  }, []);

  return (
    <div className="App">
      <h1>My todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label> Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is the task title?"
            />
          </div>

          <div className="todo-input-item">
            <label> Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the task description?"
            />
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleClick} className="primarybtn">
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondarybtn ${toggle === false && "active"}`}
            onClick={() => setToggle(false)}
          >
            Todo
          </button>
          <button
            className={`secondarybtn ${toggle === true && "active"}`}
            onClick={() => setToggle(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {toggle === false &&
            todos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDelete(index)}
                      title="Wanna Delete!?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleComplete(index)}
                      title="Completed?"
                    />
                  </div>
                </div>
              );
            })}

          {toggle === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on :{item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeleteCompleteTodo(index)}
                      title="Wanna Delete!?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
