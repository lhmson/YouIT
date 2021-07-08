import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router";
import { Layout, Typography, Input } from "antd";
import styles from "./styles.js";

import Navbar from "../../components/Navbar/Navbar";

import FriendCard from "../../components/FriendCard/FriendCard";
import COLOR from "../../constants/colors";
import * as api from "../../api/friend";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import LoadingSearch from "../../components/Loading/LoadingSearch.js";
import { SearchOutlined } from "@ant-design/icons";
import NoMutualFriends from "../../components/Loading/NoMutualFriends.js";

const { Content } = Layout;
const { Title } = Typography;

function MutualFriendPage({ props }) {
  let { id } = useParams();
  const [user, setUser] = useLocalStorage("user");
  const inputRef = useRef();
  const [listFriend, setListFriend] = useState([]);
  const [txtSearch, setTxtSearch] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    api
      .fetchListMutualFriends(user?.result?._id, id)
      .then((res) => {
        if (res.data instanceof Array) setListFriend(res.data);
        else setListFriend([]);
        setLoading(true);
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
            avatarUrl={user.avatarUrl}
            userInfo={user.userInfo}
          ></FriendCard>
        );
      }),
    [listFilter]
  );

  const handleSearch = () => {
    setTxtSearch(inputRef.current.state.value);
  };

  if (!loading)
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
            <Content style={{ background: COLOR.greenSmoke, height: "100%" }}>
              <div
                className="col-8 offset-2 "
                style={{
                  marginTop: 64,
                  alignItems: "center",
                  background: numberTotalFriend === 0 ? "white" : "whitesmoke",
                  borderRadius: 20,
                  marginBottom: 32,
                  boxShadow: "5px 5px #27AE60",
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
                    <Title>
                      ({numberTotalFriend}) Mutual Friend
                      {numberTotalFriend >= 2 ? "s" : ""}
                    </Title>
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

                <div
                  className="row"
                  style={{
                    padding: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {listUserCard}
                  {numberTotalFriend === 0 ? (
                    <NoMutualFriends></NoMutualFriends>
                  ) : null}
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
}

export default MutualFriendPage;
