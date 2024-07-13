import React, { useEffect, useRef, useState } from "react";
import TodoLists from "../TodoItems/todoItems";

const Time = new Date();
const WeekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Day = WeekDay[Time.getDay()];
const DateD = Time.getDate();
const Month = MonthName[Time.getMonth()];
const Year = Time.getFullYear();

export default function todo() {
  const [TodoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);
  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevTodos) => {
        return prevTodos.map((todo) =>{
            if(todo.id=== id){
                return {...todo, isComplete: !todo.isComplete}
            }
            return todo;
        })
    })
  }

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(TodoList))
  },[TodoList])


  return (
    <div className="w-full h-dvh bg-slate-50 flex justify-center items-center">
      {/* ------------------Title-------------------- */}
      <div className="max-w-md w-11/12 h-[550px] bg-white flex py-12 px-8 flex-col rounded-3xl shadow-xl max-sm:mx-6">
        <h1 className="text-3xl font-bold">To-Do List</h1>
        <p className="text-sm">{Day}</p>
        <p className="text-sm">
          {DateD} {Month}, {Year}
        </p>
        <div className=" bg-slate-100 rounded-full my-5">
          <input
            ref={inputRef}
            className="bg-slate-100 rounded-full py-2 px-6 outline-none w-[75%]"
            type="text"
            name="list"
            id="list"
            placeholder="Add your task"
            
          />
          <button
            onClick={add}
            type="submit"
            className=" bg-red-500 text-white py-2 max-px-8 font-bold rounded-full w-[25%]"
          >
            ADD
          </button>
        </div>
        {/* ------------------ToDo List-------------------- */}
        <div className="w-full px-6 overflow-y-scroll  no-scrollbar">
          {TodoList.map((item, index) => {
            return (
              <TodoLists
                key={index}
                Text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggle={toggle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
