import React from "react";
import { Button } from "antd";

import { Link } from "react-router-dom";

import styles from "./styles.js";

const ListButtons = () => {
  return (
    <div className="container" style={{ marginBottom: 32 }}>
      <div className="row">
        <Link to="/userinfo" style={styles.linkView}>
          <Button style={styles.button}>Posts</Button>
        </Link>
        <Link to="/userinfo/about" style={styles.linkView}>
          <Button style={styles.button}>About</Button>
        </Link>
        <Link to="/userinfo" style={styles.linkView}>
          <Button style={styles.button}>More</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListButtons;
