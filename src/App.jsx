import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}


function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false)

  return (
    <li className="list">
      {isEditing ?
        (<>
          <div className="content">
            {todo.content}
          </div>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="editInput"
          />
          <button
            onClick={() => {
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
          setIsEditing(false)
          setInputValue('')
        }}
            className="ok"
          >
            👌
          </button>
        </>)
        :
        (<>
          <input type="checkbox" className="checkbox"></input>
          <div className="content">
            {todo.content}
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="edit"
          >✏️</button>
        </>)
      }
      <button
        onClick={() => {
          setTodoList((prev) => {
            return prev.filter((el) => el.id !== todo.id);
          });
        }}
        className="delBtn"
      >
        ❌
      </button>
    </li>
  );
}

export default App;
