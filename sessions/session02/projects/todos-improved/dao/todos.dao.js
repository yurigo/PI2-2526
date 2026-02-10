import todos from "../data.js";

const getAll = () => todos;

const getById = (id) => {
  const ID = parseInt(id);
  return todos.find((unTodo) => unTodo.id === ID);
};

const create = (newTodo) => {
  newTodo.id = todos.length + 1;
  todos.push(newTodo);
  return newTodo;
};

const deleteById = (id) => {
  const ID = parseInt(id);
  const found = todos.find((e) => e.id === ID);
  const filteredTodos = todos.filter((e) => e.id !== ID);
  todos.length = 0;
  todos.push(...filteredTodos);
  return found;
};

const updateById = (id, newData) => {
  const ID = parseInt(id);
  const found = todos.find((element) => element.id === ID);
  found.done = newData.done;
  return found;
};

export { getAll, getById, create, deleteById, updateById };
