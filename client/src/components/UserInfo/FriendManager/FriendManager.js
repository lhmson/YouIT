import React from "react";
import { Button, Typography, Input } from "antd";

import styles from "./styles.js";

const { Text, Title } = Typography;
const { Search } = Input;

const FriendManager = () => {
  return (
    <div className="container" style={styles.whiteBackground}>
      <div className="row">
        <div
          className="col-2"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text style={styles.heading}>Friends</Text>
        </div>
        <div className="col-4 offset-6" style={styles.buttonRow}>
          <div className="row">
            <Button type="primary" style={styles.button}>
              Loi moi ket ban (0)
            </Button>
            <Button type="primary" style={styles.button}>
              Ban be (999)
            </Button>
          </div>
        </div>
      </div>
      <div className="row" style={styles.searchBar}>
        <Search
          placeholder="Type your friend's name"
          style={{ width: "90%", height: 500 }}
          enterButton
        />
      </div>
    </div>
  );
};

export default FriendManager;
