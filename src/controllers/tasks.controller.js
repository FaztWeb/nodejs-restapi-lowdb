import { getConnection } from "../database";
import { v4 } from "uuid";

export const getTasks = (req, res) => {
  const tasks = getConnection().get("tasks").value();
  res.json(tasks);
};

export const createTask = (req, res) => {
  const newTask = {
    id: v4(),
    name: req.body.name,
    description: req.body.description,
  };
  getConnection().get("tasks").push(newTask).write();
  res.json(newTask);
};

export const getTask = (req, res) => {
  const task = getConnection().get("tasks").find({ id: req.params.id }).value();
  res.json(task);
};

export const updateTask = async (req, res) => {
  const result = await getConnection()
    .get("tasks")
    .find({ id: req.params.id })
    .assign(req.body)
    .write();
  res.json(result);
};

export const deleteTask = async (req, res) => {
  const result = await getConnection()
    .get("tasks")
    .remove({ id: req.params.id })
    .write();
  res.json(result);
};
