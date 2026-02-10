import express from "express";
import chalk from "chalk";
import cors from "cors";
import {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
} from "./controller/todos.controller.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<a href='http://localhost:3000/todos'>click aqui para ver los todos</a>",
  );
});

app.get("/todos", getTodos);

app.get("/todos/:ID", getTodoById);

app.post("/todos", createTodo);

app.delete("/todos/:ID", deleteTodo);

app.put("/todos/:ID", updateTodo);

app.listen(3000, () => {
  console.log(chalk.blue("http://localhost:3000"));
});
