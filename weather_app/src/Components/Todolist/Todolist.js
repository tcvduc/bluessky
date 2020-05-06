import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { withStyles } from "@material-ui/core";
import Axios from "axios";
const style = (theme) => ({
  root: {
    width: "100%",
  },
});

let log = console.log;

class Todolist extends Component {
  state = {
    tasks: [],
    token: "",
    user: {},
  };

  // handle addTask
  handleAddTask = (task) => {
    // log(task);
    const oldData = [...this.state.tasks];
    // log(oldData);
    if (oldData.length > 0) {
      const dataAdd = {
        id: Math.floor(Math.random() * 10),
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
    } else {
      const dataAdd = {
        id: 0,
        description: task,
        completed: false,
      };
      const newData = [...oldData, dataAdd];

      this.setState({
        tasks: newData,
      });
    }
  };

  // Khi didmount kiểm tra token - lấy data của user đó
  componentDidMount = () => {
    // axios
    // log("Todolist did mount");
    const devURL = "http://localhost:5000";
    //  const proURL = "https://bluessky.herokuapp.com";
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
      // fixed authenticate 

      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      Axios.get(`${devURL}/tasks`, config)
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

    // let data = {
    //   HTTP_CONTENT_LANGUAGE: self.language,
    // };

    // log(token);

    // get all task of this user

    // Axios.post(`${devURL}/tasks`, {
    //   description: "ok",
    // })
    //   .then((result) => {
    //     log(result);
    //   })
    //   .catch((e) => {
    //     log(e.response);
    //   });
  };

  componentDidUpdate = () => {
    // log("Todolist did update");
    // const { user } = this.state;
    // log(user);
  };

  // handleItemClick - click thì đổi completed
  handleItemClick = (index) => {
    // log(index);
    const newData = [...this.state.tasks];
    // log(newData);
    newData[index].completed = !newData[index].completed;

    newData.sort((a, b) => {
      return a.completed - b.completed;
    });

    this.setState({
      tasks: newData,
    });
    //  log(this.state.tasks);
  };

  // del task item
  handleDelItem = (id) => {
    const newData = [...this.state.tasks];
    const result = newData.filter((data) => {
      return data.id !== id;
    });
    this.setState({
      tasks: result,
    });
  };
  render() {
    const itemComponent = this.state.tasks.map((task, index) => {
      return (
        <TaskItem
          key={index}
          id={task.id}
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
