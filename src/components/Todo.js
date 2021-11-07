import React from "react";
import firebase from "../firebase";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import CreateIcon from "@mui/icons-material/Create";
import { motion } from "framer-motion";
const Todo = ({ todo }) => {
  const deleteTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.remove();
  };
  const editTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    let edit = prompt('Edit Task "' + todo.title + '"');
    if (edit != "") {
      todoRef.update({
        title: edit,
      });
    }
  };
  const completeTodo = () => {
    const todoRef = firebase.database().ref("Todo").child(todo.id);
    todoRef.update({
      complete: !todo.complete,
    });
  };
  return (
    <>
      <div className="todo">
        <li className="list">
          {todo.complete ? (
            <CheckCircleRoundedIcon
              className="icon"
              onClick={completeTodo}
              fontSize="large"
            />
          ) : (
            <CheckCircleOutlineRoundedIcon
              className="icon"
              onClick={completeTodo}
              fontSize="large"
            />
          )}
          <CreateIcon className="icon" onClick={editTodo} fontSize="large" />
          <motion.div>
            <HighlightOffRoundedIcon
              className="icon"
              onClick={deleteTodo}
              fontSize="large"
            />
          </motion.div>
          <h5 className={todo.complete ? "complete" : "pending  "}>
            {todo.title}
          </h5>
        </li>
      </div>
    </>
  );
};
export default Todo;
