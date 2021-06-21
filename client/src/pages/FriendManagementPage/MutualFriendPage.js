import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router";
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

function MutualFriendPage({ props }) {
  let { id } = useParams();
  console.log("id", id);
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listFriend, setListFriend] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Friends");

  useEffect(() => {
    api
      .fetchListMutualFriends(user?.result?._id, id)
      .then((res) => {
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  const numberTotalFriend = listFriend.length;

  let listFilter = listFriend.filter((user) =>
    user?.name?.toLowerCase().includes(txtSearch?.toLowerCase())
  );

  const listUserCard = useMemo(
    () =>
      listFilter?.map((user, i) => {
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
                    className="col-4"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Title>Mutual Friends</Title>
                  </div>

                  <div className="col-2 offset-5">
                    <Button
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
                      Total ({numberTotalFriend})
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

                <div className="row">{listUserCard}</div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default MutualFriendPage;
