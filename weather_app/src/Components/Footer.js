import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

const styles = (theme) => ({
  root: {},
  no_border_bottom: {
    borderBottom: "none",
  },
  footer_bg: {
    backgroundImage: "",
  },
});

function createData(id, name, password) {
  return { id, name, password };
}

const rows = [
  createData(1, "cm", "12"),
  createData(2, "ch", "22"),
  createData(3, "cbx", "33"),
];

function Footer(props) {
  return <div>footer</div>;
}

export default withStyles(styles)(Footer);
