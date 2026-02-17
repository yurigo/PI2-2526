import db from "../db.js";

const getAll = async () => {
  const rows = await db.all("SELECT id, text, done FROM todos ORDER BY id");
  return rows.map((r) => ({ id: r.id, text: r.text, done: Boolean(r.done) }));
};

const getById = async (id) => {
  const ID = parseInt(id);
  const row = await db.get("SELECT id, text, done FROM todos WHERE id = ?", ID);
  if (!row) return null;
  return { id: row.id, text: row.text, done: Boolean(row.done) };
};

const create = async (newTodo) => {
  const doneVal = newTodo.done ? 1 : 0;
  const result = await db.run(
    "INSERT INTO todos(text, done) VALUES(?, ?)",
    newTodo.text,
    doneVal,
  );
  return { id: result.lastID, text: newTodo.text, done: Boolean(doneVal) };
};

const deleteById = async (id) => {
  const ID = parseInt(id);
  const found = await getById(ID);
  if (!found) return null;
  await db.run("DELETE FROM todos WHERE id = ?", ID);
  return found;
};

const updateById = async (id, newData) => {
  const ID = parseInt(id);
  const found = await getById(ID);
  if (!found) return null;
  const doneVal = newData.done ? 1 : 0;
  await db.run("UPDATE todos SET done = ? WHERE id = ?", doneVal, ID);
  return { ...found, done: Boolean(doneVal) };
};

export { getAll, getById, create, deleteById, updateById };
