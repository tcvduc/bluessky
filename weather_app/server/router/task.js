const express = require("express");
const Task = require("./../models/task");
const auth = require("./../middleware/auth");
const taskRouter = new express.Router();

let log = console.log;

// change task
taskRouter.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // validate update field
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValid) {
    return res.status(400).send({ error: "Không update được!" });
  }
  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send("Không tìm thấy task!");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all task
taskRouter.get("/tasks", auth, async (req, res) => {
  try {
    const match = {};
    const sort = {};
    const { completed, sortBy } = req.query;
    if (completed) {
      match.completed = completed;
    }
    if (sortBy) {
      const parts = sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.page - 1) * parseInt(req.query.limit),
          sort,
        },
      })
      .execPopulate();

    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get task by id
taskRouter.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send("Không tìm thấy task!");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create task
taskRouter.post("/tasks", auth, async (req, res) => {
  const data = req.body;
  log(data);
  log(req.user);
  const task = new Task({
    ...data,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    log(error);
    res.status(500).send(error);
  }
  // log(data);
});

// del task by task_id
taskRouter.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.status(404).send("Không xóa được!");
    }
    res.send({
      task,
      message: "Đã xóa!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// del all task

taskRouter.delete("/tasks", async (req, res) => {
  const del = await Task.deleteMany();
  if (del) {
    res.send(del);
  }
  res.send("Không xóa được!");
});

module.exports = taskRouter;
