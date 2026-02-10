import {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
} from "../dao/todos.dao.js";

const getTodos = (req, res) => {
  const all = getAll();
  res.status(200).send(all);
};

const getTodoById = (req, res) => {
  const found = getById(req.params.ID);
  res.status(200).send(found);
};

const createTodo = (req, res) => {
  const newTodo = req.body;
  const created = create(newTodo);
  res.status(201).send(created);
};

const deleteTodo = (req, res) => {
  const found = deleteById(req.params.ID);
  res.status(200).send(found);
};

const updateTodo = (req, res) => {
  const newData = req.body;
  const found = updateById(req.params.ID, newData);
  res.status(200).send(found);
};

export { getTodos, getTodoById, createTodo, deleteTodo, updateTodo };
