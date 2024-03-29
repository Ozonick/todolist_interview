import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Todo from "./Todo";

const TodoList = () => {
  const [todoList, setTodoList] = useState();
  useEffect(() => {
    const todoRef = firebase.database().ref("Todo");
    todoRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      console.log(snapshot);
      const todos = snapshot.val();
      console.log(todos);
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
      }
      setTodoList(todoList);
    });
  }, []);
  return (
    <>
      <h2>ToDoList</h2>
      <motion.div layout>
        {todoList
          ? todoList.map((todo, index) => <Todo todo={todo} key={index} />)
          : ""}
      </motion.div>
    </>
  );
};
export default TodoList;
