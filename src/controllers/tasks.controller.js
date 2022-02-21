import { getConnection } from "../database.js";
import { v4 } from "uuid";

export const getTasks = (req, res) => {
  const tasks = getConnection().data.tasks;
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const newTask = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const db = getConnection();
    db.data.tasks.push(newTask);
    await db.write();

    res.json(newTask);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getTask = (req, res) => {
  const taskFound = getConnection().data.tasks.find(
    (t) => t.id === req.params.id
  );
  if (!taskFound) res.sendStatus(404);
  res.json(taskFound);
};

export const updateTask = async (req, res) => {
  const { name, description } = req.body;

  try {
    const db = getConnection();
    const taskFound = db.data.tasks.find((t) => t.id === req.params.id);
    if (!taskFound) return res.sendStatus(404);

    taskFound.name = name;
    taskFound.description = description;

    db.data.tasks.map((t) => (t.id === req.params.id ? taskFound : t));

    await db.write();

    res.json(taskFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteTask = async (req, res) => {
  const db = getConnection();
  const taskFound = db.data.tasks.find((t) => t.id === req.params.id);
  if (!taskFound) res.sendStatus(404);

  const newTasks = db.data.tasks.filter((t) => t.id !== req.params.id);
  db.data.tasks = newTasks;
  await db.write();

  return res.json(taskFound);
};

export const count = async (req, res) => {
  const totalTasks = getConnection().data.tasks.length;
  res.json(totalTasks);
};
