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

  try {
    getConnection().get("tasks").push(newTask).write();

    res.json(newTask);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getTask = (req, res) => {
  const task = getConnection().get("tasks").find({ id: req.params.id }).value();

  if (!task) res.sendStatus(404);

  res.json(task);
};

export const updateTask = async (req, res) => {
  try {
    const taskFound = await getConnection()
      .get("tasks")
      .find({ id: req.params.id })
      .value();

    if (!taskFound) return res.sendStatus(404);

    const result = await getConnection()
      .get("tasks")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteTask = async (req, res) => {
  const result = await getConnection()
    .get("tasks")
    .remove({ id: req.params.id })
    .write();

  if (result.length === 0) return res.sendStatus(404);

  res.json(result);
};

export const count = async (req, res) => {
  const totalTasks = await getConnection().get("tasks").value();

  res.json(totalTasks.length);
};
