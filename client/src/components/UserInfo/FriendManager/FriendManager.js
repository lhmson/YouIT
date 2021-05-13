import React, { useRef } from "react";
import { Button, Typography, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./styles.js";
import UserCard from "../../UserCard/UserCard.js";
import COLOR from "../../../constants/colors.js";

const { Text, Title } = Typography;
const { Search } = Input;

const FriendManager = () => {
  const inputRef = useRef();

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
            <Button className="green-button mr-2">Friend requests (0)</Button>
            <Button className="green-button mr-2">Friends (999)</Button>
          </div>
        </div>
      </div>
      {/* <div className="row" style={styles.searchBar}>
        <Search placeholder="Type your friend's name" style={{}} enterButton />
      </div> */}
      <div className="row" style={styles.searchBar}>
        <Input
          // onPressEnter={handleSearch}
          allowClear
          suffix={
            <SearchOutlined
              // onClick={handleSearch}
              style={{ fontSize: 24, color: COLOR.black }}
            />
          }
          ref={inputRef}
          bordered={false}
          style={{ backgroundColor: COLOR.white }}
        />
      </div>

      <div className="row">
        <div className="col-6">
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
        </div>
        <div className="col-6">
          <UserCard></UserCard>
          <UserCard></UserCard>
          <UserCard></UserCard>
        </div>
      </div>
    </div>
  );
};

export default FriendManager;
