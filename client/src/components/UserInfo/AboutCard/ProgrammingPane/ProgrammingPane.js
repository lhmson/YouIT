import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.js";

function ProgrammingPane() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return <></>;
}

export default ProgrammingPane;
