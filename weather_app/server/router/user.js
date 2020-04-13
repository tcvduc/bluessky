const express = require("express");
const User = require("./../models/user");
const Userrouter = new express.Router();

let log = console.log;

// login - post
Userrouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// logout - post
Userrouter.post("/users/logout", async (req, res) => {
  log(req.user);
  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// create user - post method
Userrouter.post("/users", async (req, res) => {
  const data = req.body;
  try {
    const newUser = new User(data);
    await newUser.save();
    res.status(200).send("Create user successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// read user - get method
// read all user
Userrouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// user read their self - user infor
// router.get("/users/me", async (req, res) => {
//   log(req.user);
//   res.send(req.user);
// });

// read user by :id params
Userrouter.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// udpate - patch method
Userrouter.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  // validate update field
  const updates = Object.keys(req.body); // ["name","email","password"]
  const allowdUpdates = ["name", "email", "password"];
  const isValid = updates.every((update) => {
    return allowdUpdates.includes(update);
  });

  if (!isValid) {
    return res.status(404).send({ error: "Invalid update!" });
  }

  try {
    const user = await User.findById(_id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    if (!user) {
      return res.status(404).send();
    }
    res.send("Update success!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// delete user - delete method
Userrouter.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send(user);
    }
    res.status(200).send("Deleted!");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = Userrouter;
