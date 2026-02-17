import {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
} from "../dao/todos.dao.js";

const getTodos = async (req, res) => {
  const all = await getAll();
  res.status(200).send(all);
};

const getTodoById = async (req, res) => {
  const found = await getById(req.params.ID);
  if (!found) return res.status(404).send({ error: "Not found" });
  res.status(200).send(found);
};

const createTodo = async (req, res) => {
  const newTodo = req.body;
  const created = await create(newTodo);
  res.status(201).send(created);
};

const deleteTodo = async (req, res) => {
  const found = await deleteById(req.params.ID);
  if (!found) return res.status(404).send({ error: "Not found" });
  res.status(200).send(found);
};

const updateTodo = async (req, res) => {
  const newData = req.body;
  const found = await updateById(req.params.ID, newData);
  if (!found) return res.status(404).send({ error: "Not found" });
  res.status(200).send(found);
};

export { getTodos, getTodoById, createTodo, deleteTodo, updateTodo };
