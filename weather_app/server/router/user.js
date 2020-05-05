const express = require("express");
const User = require("./../models/user");
const auth = require("./../middleware/auth");
const path = require("path");
const Userrouter = new express.Router();

let log = console.log;

// create user - post method - sign up
Userrouter.post("/users/sign-up", async (req, res) => {
  const data = req.body;

  // Nếu đã tồn tại user name trong DB thì không cho tạo
  const { username, email } = data;

  const users = await User.findOne({ username });
  if (users) {
    // log("User name is not available!");
    // Nếu mail đã đăng ký rồi thì không cho đăng ký
    const checkMail = await User.findOne({ email });

    if (checkMail) {
      res.send({
        error: "Email has been used!",
        status: 500,
      });
    } else {
      res.send({
        error: "User name is not available!",
        status: 500,
      });
    }
  } else {
    try {
      const newUser = new User(data);
      await newUser.save();
      // log("Create user successfully!");
      //   res.status(200).send("Create user successfully!");

      res.send({
        message: "Create user successfully!",
        status: 200,
      });
    } catch (error) {
      //    log(error.message);
      res.send({
        error: error.message,
        status: 500,
      });
      //  res.status(500).send(error.message);
    }
  }
});

// login - get
Userrouter.get("/users/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

// login - post
Userrouter.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error.message);

    // res.status(500).send(error.message);
  }
});

// logout - post
Userrouter.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("Logout success");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// logout all device
Userrouter.post("/users/logoutalldevice", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send("Logout all device!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// read user - get method
// read all user
Userrouter.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//user read their self - user infor
Userrouter.get("/users/me", auth, async (req, res) => {
  // log(req.user);
  res.send(req.user);
});

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

// del all user
Userrouter.delete("/users", async (req, res) => {
  try {
    const delAllUser = await User.deleteMany();
    if (delAllUser) {
      res.status(200).send("Deleted all user!");
    }
  } catch (error) {
    res.status(500).send(error.message);
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
