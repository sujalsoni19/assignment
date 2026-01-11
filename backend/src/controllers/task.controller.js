import asyncHandler from "../utils/asyncHandler.js";
import Apierror from "../utils/Apierror.js";
import Apiresponse from "../utils/Apiresponse.js";
import { Task } from "../models/task.model.js";


const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    throw new Apierror(400, "Task title is required");
  }

  const task = await Task.create({
    title,
    owner: req.user._id,
  });

  return res.status(201).json(new Apiresponse(201, task, "Task created"));
});

const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  return res.status(200).json(new Apiresponse(200, tasks, "Tasks fetched"));
});

const toggleTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id, owner: req.user._id });

  if (!task) {
    throw new Apierror(404, "Task not found");
  }

  task.completed = !task.completed;
  await task.save();

  return res
    .status(200)
    .json(new Apiresponse(200, task, "Task status updated"));
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  if (!task) {
    throw new Apierror(404, "Task not found");
  }

  return res.status(200).json(new Apiresponse(200, {}, "Task deleted"));
});

export { createTask, getMyTasks, toggleTask, deleteTask };
