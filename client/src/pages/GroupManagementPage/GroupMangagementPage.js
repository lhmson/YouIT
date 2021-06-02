import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import { useDispatch } from "react-redux";
import { Button } from "antd";
import FriendCard from "../../components/FriendCard/FriendCard";
import COLOR from "../../constants/colors";
import * as api from "../../api/friend";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { SearchOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

function GroupManagementPage() {
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listFriend, setListFriend] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Friends");

  useEffect(() => {
    console.log("User", user);
    api
      .fetchListMyFriends(user?.result?._id)
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  useEffect(() => {
    api
      .fetchListRequestFriends(user?.result?._id)
      .then((res) => {
        console.log("Lala", res.data);
        if (res.data instanceof Array) setListRequest(res.data);
        else setListRequest([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user]);

  const numberTotalFriend = listFriend.length;

  let listFilter = listFriend.filter((user) =>
    user.name.toLowerCase().includes(txtSearch.toLowerCase())
  );

  if (mode === "Invites") {
    listFilter = listRequest.filter((user) =>
      user.name.toLowerCase().includes(txtSearch.toLowerCase())
    );
  }

  const listUserCardLeft = useMemo(
    () =>
      listFilter?.map((user, i) => {
        if (i % 2 == 0)
          return (
            <FriendCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
            ></FriendCard>
          );
      }),
    [listFilter]
  );

  const listUserCardRight = useMemo(
    () =>
      listFilter?.map((user, i) => {
        if (i % 2 == 1)
          return (
            <FriendCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
            ></FriendCard>
          );
      }),
    [listFilter]
  );

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  return (
    <>
      <Layout>
        <Navbar />
        <Layout>
          <Layout style={styles.mainArea}>
            <Content>
              <div
                className="col-8 offset-2 "
                style={{
                  marginTop: 64,
                  alignItems: "center",
                }}
              >
                <div className="row" style={{ paddingTop: 16 }}>
                  <div
                    className="col-3"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Title>Groups</Title>
                  </div>
                  <div className="offset-5 col-2">
                    <Button
                      onClick={() => setMode("Invites")}
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Waiting ({listRequest.length})
                    </Button>
                  </div>

                  <div className="col-2">
                    <Button
                      onClick={() => setMode("Friends")}
                      type="primary"
                      style={{
                        background: "#27AE60",
                        borderColor: "#27AE60",
                        color: "white",
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Groups ({numberTotalFriend})
                    </Button>
                  </div>
                </div>

                <div
                  className="row"
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                >
                  <Input
                    onPressEnter={handleSearch}
                    allowClear
                    suffix={
                      <SearchOutlined
                        onClick={() => {}}
                        style={{ fontSize: 24, color: COLOR.white }}
                      />
                    }
                    ref={inputRef}
                    bordered={false}
                    style={{
                      backgroundColor: COLOR.lightGreen,
                    }}
                    defaultValue={""}
                  />
                </div>

                <div className="row">
                  <div className="col-6">{listUserCardLeft}</div>
                  <div className="col-6">{listUserCardRight}</div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default GroupManagementPage;
