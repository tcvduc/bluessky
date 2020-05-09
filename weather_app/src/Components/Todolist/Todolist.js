import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { withStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";
const style = (theme) => ({
  root: {
    width: "100%",
  },
});

let log = console.log;

const devURL = "http://localhost:5000";
//const proURL = "https://bluessky.herokuapp.com";

// CRUD
class Todolist extends Component {
  state = {
    tasks: [],
    token: "",
    user: {},
  };

  // Create
  // handle addTask
  handleAddTask = (task) => {
    // log(task);
    const oldData = [...this.state.tasks];
    // log(oldData);

    // handle ID không được nên chơi random

    // add react _id react khong phai node
    const dataAdd = {
      _id: uuidv4(),
      description: task,
      completed: false,
    };

    const newData = [...oldData, dataAdd];
    newData.sort((a, b) => {
      return a.completed - b.completed;
    });
    this.setState({
      tasks: newData,
    });

    const userInfor = localStorage.getItem("userInfor");
    if (userInfor) {
      const { token } = JSON.parse(userInfor);
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      // add node - bên node tự random id rồi nênh khỏi lấy _id

      // axios
      Axios.post(`${devURL}/tasks`, dataAdd, config)
        .then((rs) => {
          // thêm thành công
          // log(rs.data.message);
        })
        .catch((e) => {
          log(e.response);
        });
    }
  };

  // checkID
  // checkID = (id) => {
  //   const { tasks } = this.state;
  //   if (tasks.length > 0) {
  //     tasks.forEach((task) => {
  //       if (task.id === id) {
  //         id++;
  //       }
  //     });
  //   }
  // };

  // Khi didmount kiểm tra token - lấy data của user đó
  // Read
  componentDidMount = () => {
    // axios
    // log("Todolist did mount");

    const userInfor = localStorage.getItem("userInfor");
    if (userInfor) {
      // parse it
      const userJSON = JSON.parse(userInfor);

      const { token, user } = userJSON;
      this.setState({
        token: token,
        user: user,
      });
      // log(token);

      // new bug please authenticate
      // fixed

      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      // axios
      // get all task of this user
      Axios.get(`${devURL}/tasks?sortBy=completed:asc&limit=max`, config)
        .then((rs) => {
          this.setState({
            tasks: rs.data,
          });
          // log(rs);
        })
        .catch((er) => {
          log(er.response);
        });
    }
  };

  // Bug mới - khi didupdate todolist thì không có _Id của các Item - _id nó phải đợi server render ra mới có
  // fixed - thêm trường _id cho task model - uuid random id

  // handleItemClick - click thì đổi completed
  // Update
  handleItemClick = (index) => {
    // log(index);
    // log(this.state.tasks);
    const newData = [...this.state.tasks];
    // log(newData);
    newData[index].completed = !newData[index].completed;

    newData.sort((a, b) => {
      return a.completed - b.completed;
    });

    this.setState({
      tasks: newData,
    });
    // log(this.state.tasks);

    const userInfor = localStorage.getItem("userInfor");

    if (userInfor) {
      const { token } = JSON.parse(userInfor);

      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let { _id, completed } = this.state.tasks[index];
      // log(_id);
      //log(completed);
      // axios
      Axios.patch(
        `${devURL}/tasks/${_id}`,
        {
          completed,
        },
        config
      )
        .then((rs) => {
          // thay đổi thành công
          // log(rs.data.message);
        })
        .catch((e) => {
          log(e.response);
        });
    }
  };

  // del task item
  // Delete
  // id bên react khác _id bên node

  // bug mới - khi ấn xóa nhanh quá nó không kịp cast ID -> fixed - cho model task required trường id, qua bênh react cho random
  // bug mới - repeat n lần component lyfe circle -> fiexd - không setState trong mấy cái life circle component Update
  handleDelItem = (_id) => {
    const newData = [...this.state.tasks];

    // log(this.state.tasks);
    // log(_id);
    const result = newData.filter((data) => {
      return data._id !== _id;
    });
    this.setState({
      tasks: result,
    });

    // log(this.state.tasks);
    const userInfor = localStorage.getItem("userInfor");

    if (userInfor) {
      const { token } = JSON.parse(userInfor);
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      // log(_id);
      // Axios

      Axios.delete(`${devURL}/tasks/${_id}`, config)
        .then((rs) => {
          // xóa thành công
          // log(rs.data.message);
        })
        .catch((e) => {
          log(e.response);
        });
    }
  };
  render() {
    const itemComponent = this.state.tasks.map((task, index) => {
      return (
        <TaskItem
          key={index}
          id={task._id}
          description={task.description}
          completed={task.completed}
          itemClick={() => {
            this.handleItemClick(index);
          }}
          delItem={this.handleDelItem}
        />
      );
    });
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TaskInput addTask={this.handleAddTask} />
        <TaskList>{itemComponent}</TaskList>
      </div>
    );
  }
}

export default withStyles(style)(Todolist);
