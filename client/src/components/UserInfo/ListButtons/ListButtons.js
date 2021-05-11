import React, { useEffect } from "react";
import { Button } from "antd";

import { Link } from "react-router-dom";

import styles from "./styles.js";
import { useSelector } from "react-redux";

const ListButtons = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {}, [user]);

  return (
    <div className="container" style={{ marginBottom: 32 }}>
      <div className="row">
        <Link to={`/userinfo/${user?._id}`} style={styles.linkView}>
          <Button style={styles.button}>Posts</Button>
        </Link>
        <Link to={`/userinfo/${user?._id}/about`} style={styles.linkView}>
          <Button style={styles.button}>About</Button>
        </Link>
        <Link to="/wall" style={styles.linkView}>
          <Button style={styles.button}>More</Button>
        </Link>
      </div>
    </div>
  );
};

export default ListButtons;
