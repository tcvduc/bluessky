import React, { Component } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskItem from "./TaskItem";
import { withStyles } from "@material-ui/core";

const style = (theme) => ({
  root: {
    width: "100%",
  },
});

let log = console.log;

class Todolist extends Component {
  state = {
    tasks: [
      {
        id: 1,
        description: "Hoc node 1",
        completed: false,
      },
      {
        id: 2,
        description: "Hoc node 2",
        completed: true,
      },
      {
        id: 3,
        description: "Hoc node 3",
        completed: true,
      },
    ],
  };

  // handle addTask
  handleAddTask = (task) => {
    //  log(task);
    const oldData = [...this.state.tasks];
    const dataAdd = {
      id: oldData[oldData.length - 1].id + 1,
      description: task,
      completed: false,
    };
    const newData = [...oldData, dataAdd];
    this.setState({
      tasks: newData,
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
