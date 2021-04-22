import React from "react";
import { Button } from "antd";

import styles from "./styles.js";

const ListButtons = () => {
  return (
    <div className="container" style={{ marginBottom: 32 }}>
      <div className="row">
        <Button style={styles.button}>Posts</Button>
        <Button style={styles.button}>About</Button>
        <Button style={styles.button}>More</Button>
      </div>
    </div>
  );
};

export default ListButtons;
