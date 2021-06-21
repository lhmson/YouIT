import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "antd";
import FriendCard from "../../components/FriendCard/FriendCard";
import UserRequestCard from "../../components/FriendCard/UserRequestCard";
import COLOR from "../../constants/colors";
import * as api from "../../api/friend";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import { SearchOutlined } from "@ant-design/icons";
import LoadingSearch from "../../components/Loading/LoadingSearch.js";

const { Content } = Layout;
const { Title } = Typography;

function FriendManagementPage() {
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listFriend, setListFriend] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [mode, setMode] = useState("Friends");
  const [updateData, setUpdateData] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  useEffect(() => {
    setLoading1(false);
    api
      .fetchListMyFriends(user?.result?._id)
      .then((res) => {
        console.log(res.data);
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
        setLoading1(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, updateData]);

  useEffect(() => {
    setLoading2(false);
    api
      .fetchListRequestFriends(user?.result?._id)
      .then((res) => {
        console.log("Lala", res.data);
        if (res.data instanceof Array) setListRequest(res.data);
        else setListRequest([]);
        setLoading2(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user, updateData]);

  const numberTotalFriend = listFriend.length;

  let listFilter = listFriend.filter((user) =>
    user?.name?.toLowerCase().includes(txtSearch?.toLowerCase())
  );

  if (mode === "Requests") {
    listFilter = listRequest.filter((user) =>
      user?.name?.toLowerCase().includes(txtSearch?.toLowerCase())
    );
  }

  const listUserCard = useMemo(
    () =>
      listFilter?.map((user, i) => {
        if (mode === "Friends")
          return (
            <FriendCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
              avatarUrl={user.avatarUrl}
            ></FriendCard>
          );
        else
          return (
            <UserRequestCard
              _id={user._id}
              name={user.name}
              relationship="Add Friend"
              setUpdateData={setUpdateData}
              updateData={updateData}
              avatarUrl={user.avatarUrl}
            ></UserRequestCard>
          );
      }),
    [listFilter]
  );

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  if (!loading1 || !loading2)
    return (
      <div
        style={{ flex: 1, background: "white", height: 1000, paddingTop: 64 }}
      >
        <LoadingSearch></LoadingSearch>
      </div>
    );
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
                    <Title>Friends</Title>
                  </div>
                  <div className="offset-5 col-2">
                    <Button
                      onClick={() => setMode("Requests")}
                      type="primary"
                      style={{
                        background: COLOR.green,
                        borderColor: COLOR.green,
                        color: "white",
                        fontWeight: 500,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Requests ({listRequest.length})
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
                      Friends ({numberTotalFriend})
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

                <div className="row" style={{ padding: 32 }}>
                  {listUserCard}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default FriendManagementPage;
